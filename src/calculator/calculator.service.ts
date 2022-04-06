import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { Calculator } from './calculator.entity';
import { CreateCalculatorDto, UpdateCalculatorDto } from './calculator.dto';
import { DistancePrice } from './distancePrice.entity';
import { CreateDistancePriceDto } from './distancePrice.dto';
import { CreateDeliveryDto } from 'src/delivery/delivery.dto';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectRepository(Calculator)
    private calculatorsRepository: Repository<Calculator>,
    @InjectRepository(DistancePrice)
    private distancePricesRepository: Repository<DistancePrice>,
  ) {}

  // Create price calculator
  async create(createCalculatorDto: CreateCalculatorDto) {
    await this.checkIfExsits();
    const { distancePrices, ...calculatorData } = createCalculatorDto;

    const calculator = await this.calculatorsRepository
      .create(calculatorData)
      .save();
    // Is not necesary to be sync
    this.addDistancePrice(calculator, distancePrices);
    return;
  }

  addDistancePrice(
    calculator: Calculator,
    distancePrices: CreateDistancePriceDto[],
  ) {
    distancePrices.forEach((element) => {
      const distancePrice = this.distancePricesRepository.create(element);
      distancePrice.calculator = calculator;
      distancePrice.save();
    });
  }

  async checkIfExsits(): Promise<Calculator[]> {
    const calculator = await this.calculatorsRepository.find();
    if (calculator.length) {
      throw new BadRequestException('Price calculator already exits');
    }
    return;
  }

  async findById(uuid: string): Promise<Calculator> {
    const calculator = await this.calculatorsRepository.findOne(uuid);
    if (!calculator) {
      throw new NotFoundException('Price calculator not found');
    }
    return calculator;
  }

  async update(uuid: string, updateCalculatorDto: UpdateCalculatorDto) {
    const calculator = await this.findById(uuid);
    const { distancePrices, ...rest } = updateCalculatorDto;
    await this.updateDistancePrices(uuid, distancePrices);
    this.calculatorsRepository.save({
      ...calculator,
      ...rest,
    });
    return;
  }

  async updateDistancePrices(
    uuid: string,
    distancePrices: CreateDistancePriceDto[],
  ) {
    if (distancePrices) {
      const arrDistancePrice: DistancePrice[] = [];
      // First check if exists all intervals
      for (const iterator of distancePrices) {
        const distancePrice = await this.distancePricesRepository.findOne({
          where: { from: iterator.from, to: iterator.to, calculator: uuid },
        });
        if (!distancePrice) {
          throw new NotFoundException(
            "One interval of distance price doesn't exists",
          );
        }
        // if exits change new price
        distancePrice.price = iterator.price;
        // add in array of DistancePrice
        arrDistancePrice.push(distancePrice);
      }
      // If there was no error, save all new prices
      arrDistancePrice.forEach((element) => {
        element.save();
      });
    }
    return;
  }

  async getTariffs(): Promise<Calculator> {
    const tariffs = await this.calculatorsRepository.findOne({
      relations: ['distancePrices'],
    });
    if (!tariffs) {
      throw new NotFoundException(
        "Tarriffs does't exists. Contact with administrator",
      );
    }
    return tariffs;
  }

  async calculatePrice(payload: Partial<CreateDeliveryDto>): Promise<number> {
    const tariffs = await this.getTariffs();
    const { distance, countPackages } = payload;
    const { basePrice, additionalPackage, distancePrices } = tariffs;

    // Base
    let subtotal = basePrice;
    // Packages
    if (countPackages > 1) {
      subtotal += additionalPackage * (countPackages - 1);
    }
    // Distance
    distancePrices.forEach((element) => {
      if (distance >= element.from && (distance < element.to || !element.to)) {
        subtotal += element.price * distance;
      }
    });
    // Total Price
    return subtotal;
  }

  calculateWeekend(price: number, date: Date): number {
    const day = new Date(date).getDay();
    // if weekend returns 10% of total price
    return day === 6 || day === 0 ? +(price * 0.1).toFixed(2) : 0;
  }
}

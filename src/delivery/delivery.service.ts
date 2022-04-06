import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './delivery.dto';
import { Delivery } from './delivery.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  // Create delivery request
  async create(
    createDeliveryDto: CreateDeliveryDto,
    totalPrice: number,
    extraWeekend: number,
  ) {
    const delivery = await this.deliveryRepository.create({
      ...createDeliveryDto,
      totalPrice,
      extraWeekend,
    });
    delivery.save();
    return;
  }
}

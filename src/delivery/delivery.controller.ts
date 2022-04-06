import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CalculatorService } from '../calculator/calculator.service';
import { EmailService } from '../notifications/email.service';
import { CreateDeliveryDto } from './delivery.dto';
import { DeliveryService } from './delivery.service';

@ApiTags('delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly calculatorService: CalculatorService,
    private readonly emailService: EmailService,
  ) {}
  // CREATE DELIVERY REQUEST

  @ApiCreatedResponse({
    description: 'Delivery request was created',
  })
  @Post()
  async createDeliveryRequest(@Body() createDeliveryDto: CreateDeliveryDto) {
    const { date, firstName, lastName, email, ...dataToCalculate } =
      createDeliveryDto;
    // Calculate price distance + count of packages
    const totalPrice = await this.calculatorService.calculatePrice(
      dataToCalculate,
    );
    // Calculate 10% extra if it's weekend
    const extraWeekend = this.calculatorService.calculateWeekend(
      totalPrice,
      date,
    );
    // Not necessary sync
    this.deliveryService.create(createDeliveryDto, totalPrice, extraWeekend);
    this.emailService.send(createDeliveryDto, totalPrice, extraWeekend);

    return { statusCode: 201, message: 'Delivery request was created' };
  }
}

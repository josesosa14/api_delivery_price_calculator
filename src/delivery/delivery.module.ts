import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calculator } from 'src/calculator/calculator.entity';
import { CalculatorService } from 'src/calculator/calculator.service';
import { DistancePrice } from 'src/calculator/distancePrice.entity';
import { EmailService } from 'src/notifications/email.service';
import { DeliveryController } from './delivery.controller';
import { Delivery } from './delivery.entity';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery, Calculator, DistancePrice])],
  controllers: [DeliveryController],
  providers: [DeliveryService, CalculatorService, EmailService],
})
export class DeliveryModule {}

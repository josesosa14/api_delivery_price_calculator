import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculatorController } from './calculator.controller';
import { Calculator } from './calculator.entity';

import { CalculatorService } from './calculator.service';
import { DistancePriceMiddleware } from './distance-price.middleware';
import { DistancePrice } from './distancePrice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calculator, DistancePrice])],
  controllers: [CalculatorController],
  providers: [CalculatorService],
  exports: [CalculatorService],
})
export class CalculatorModule {
  // To check from to values in distance price object
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DistancePriceMiddleware)
      .forRoutes('calculator');
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalculatorController } from './calculator.controller';
import { CreateCalculatorDto } from './calculator.dto';
import { Calculator } from './calculator.entity';
import { CalculatorService } from './calculator.service';
import { DistancePrice } from './distancePrice.entity';

describe('CalculatorController', () => {
  let calculatorController: CalculatorController;
  let spyService: CalculatorService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CalculatorService,
      useFactory: () => ({
        create: jest.fn(() => []),
        showAll: jest.fn(() => [])
      })
    }
    const calculatorRepository = new Repository<Calculator>();
    const distancePriceRepository = new Repository<DistancePrice>();
    const calculator: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService, {
        provide: getRepositoryToken(Calculator),
        useValue: calculatorRepository,
      }, {
        provide: getRepositoryToken(DistancePrice),
        useValue: distancePriceRepository,
      }, ApiServiceProvider]
    }).compile();

    calculatorController = calculator.get<CalculatorController>(CalculatorController);
    spyService = calculator.get<CalculatorService>(CalculatorService);
  });

  it("calling create method", () => {
    const dto = new CreateCalculatorDto();
    expect(calculatorController.create(dto)).not.toEqual(null);
  })

  it("calling create method", () => {
    const dto = new CreateCalculatorDto();
    calculatorController.create(dto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  })
});

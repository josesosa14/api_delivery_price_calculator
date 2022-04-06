import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculator } from './calculator.entity';
import { CalculatorService } from './calculator.service';
import { DistancePrice } from './distancePrice.entity';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const calculatorRepository = new Repository<Calculator>();
    const distancePriceRepository = new Repository<DistancePrice>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService, {
        provide: getRepositoryToken(Calculator),
        useValue: calculatorRepository,
      }, {
        provide: getRepositoryToken(DistancePrice),
        useValue: distancePriceRepository,
      }],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

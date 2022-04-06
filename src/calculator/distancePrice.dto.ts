import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsInt,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsGreater } from './number.decorator';

export class CreateDistancePriceDto {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  from: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  @IsOptional()
  @Min(1)
  @IsGreater('from', {
    message: 'to must be greater than from or null',
  })
  to: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}

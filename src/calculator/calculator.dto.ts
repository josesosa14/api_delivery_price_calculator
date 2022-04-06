import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  ArrayUnique,
  ValidateNested,
  IsPositive,
  IsInt,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateDistancePriceDto } from './distancePrice.dto';

export class CreateCalculatorDto {

  @ApiProperty({ description: 'Positive number' })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  basePrice: number;

  @ApiProperty({ description: 'Positive integer number' })
  @IsNumber()
  @IsPositive()
  @IsInt()
  additionalPackage: number;

  @ApiProperty({description: 'DistancePrice object array'})
  @IsArray()
  @ArrayUnique((o) => o.from)
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDistancePriceDto)
  distancePrices: CreateDistancePriceDto[];
}

export class UpdateCalculatorDto extends CreateCalculatorDto {

  @ApiPropertyOptional({ description: 'Positive number' })
  @IsOptional()
  basePrice: number;

  @ApiPropertyOptional({ description: 'Positive integer number' })
  @IsOptional()
  additionalPackage: number;

  @ApiPropertyOptional({description: 'DistancePrice object array'})
  @IsOptional()
  distancePrices: CreateDistancePriceDto[];
}

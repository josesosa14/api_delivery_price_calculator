import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
  IsInt,
  IsAlpha,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsGreaterToday, IsValidDateTime } from './isValidDate.decorator';

export class CreateDeliveryDto {
  @IsOptional()
  @IsString()
  uuid: string;

  @ApiProperty({ description: 'Positive integer numbers' })
  @IsNumber()
  @IsPositive()
  distance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsValidDateTime('date', {
    message: 'date must be a valid date(Required format: YYYY-MM-DD HH:II)',
  })
  @IsGreaterToday('utc', {
    message: 'date must be greater than current date',
  })
  date: Date;

  @ApiProperty({ description: 'Positive integer numbers' })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  countPackages: number;

  @ApiProperty()
  @IsAlpha()
  @MinLength(2)
  firstName: string;

  @ApiProperty()
  @IsAlpha()
  @MinLength(2)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}

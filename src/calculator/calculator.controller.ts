import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateCalculatorDto, UpdateCalculatorDto } from './calculator.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CalculatorService } from './calculator.service';
import { Calculator } from './calculator.entity';

@ApiTags('calculator')
@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}
  // CREATE PRICE CALCULATOR

  @ApiCreatedResponse({
    description: 'Price calculator has been created',
  })
  @ApiBadRequestResponse({
    description: '[Price calculator already exists]',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCalculatorDto: CreateCalculatorDto) {
    // Create the new Price calculator
    await this.calculatorService.create(createCalculatorDto);
    return { statusCode: 201, message: 'Price calculator has been created' };
  }

  // UPDATE PRICE CALCULATOR (TARIFFS)

  @ApiResponse({ status: 200, description: 'Price calculator has been edited' })
  @ApiBadRequestResponse({
    description:
      'Validation failed (uuid  is expected)',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Price calculator not found' })
  @ApiBearerAuth()

  @UseGuards(JwtAuthGuard)
  @Put(':uuid')
  async update(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() updateCalculatorDto: UpdateCalculatorDto) {
    await this.calculatorService.update(uuid, updateCalculatorDto);
    return {statusCode: 200, message:'Price calculator has been edited'};
  }

  @ApiResponse({ status: 200, type: Calculator })
  @ApiNotFoundResponse({ description: 'Tariffs not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  show() {
    return this.calculatorService.getTariffs();
  }
}

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // CREATE USER

  @ApiCreatedResponse({
    description: 'User has been created',
    type: User,
  })
  @ApiBadRequestResponse({
    description: '[Email already exists], [Email exists but was removed]',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Create the new user
    const user = await this.usersService.create(createUserDto);
    return {
      statusCode: 201,
      message: 'User has been created',
      data: user,
    };
  }

  // GET USER BY ID

  @ApiResponse({ status: 200, type: User })
  @ApiBadRequestResponse({
    description: 'Validation failed (uuid  is expected)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  show(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.usersService.showById(uuid);
  }

  // GET ALL USERS
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            results: {
              type: 'array',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({ description: 'Users not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  showAll() {
    return this.usersService.findAll();
  }
}

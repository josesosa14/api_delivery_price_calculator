import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Match } from '../auth/match.decorator';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Passwords will contain at least 1 upper case letter. Passwords will contain at least 1 lower case letter. Passwords will contain at least 1 number or special character',
    minimum: 8,
    maximum: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'Match with password',
    minimum: 8,
    maximum: 20,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', {
    message: 'Password mismatch',
  })
  passwordConfirm: string;

  public static from(dto: Partial<CreateUserDto>) {
    const user = new CreateUserDto();
    user.uuid = dto.uuid;
    user.email = dto.email;
    return user;
  }

  public static fromEntity(entity: User) {
    return this.from({
      uuid: entity.uuid,
      email: entity.email,
    });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    await this.emailExists(createUserDto.email);
    const user = this.usersRepository.create(createUserDto);
    await user.save();
    return CreateUserDto.fromEntity(user);
  }

  async showById(uuid: string): Promise<User> {
    const user = await User.findOne(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toResponse();
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async emailExists(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: Raw(
          (alias) => `LOWER(${alias}) Like '%${email.toLowerCase()}%'`,
        ),
      },
    });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    return false;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: { isDeleted: false },
    });
    if (!users.length) {
      throw new NotFoundException('Users not found');
    }
    users.forEach((u) => {
      u.regularData();
    });
    return users;
  }

  async findOne(uuid: string): Promise<User> {
    const user = await User.findOne(uuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

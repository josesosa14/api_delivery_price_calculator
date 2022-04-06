import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let spyService: UsersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        create: jest.fn(() => []),
        showAll: jest.fn(() => [])
      })
    }
    const userRepository = new Repository<User>();
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useValue: userRepository,
      }, ApiServiceProvider],
    }).compile();

    usersController = user.get<UsersController>(UsersController);
    spyService = user.get<UsersService>(UsersService);
  });

  it("calling create method", () => {
    const dto = new CreateUserDto();
    expect(usersController.create(dto)).not.toEqual(null);
  })

  it("calling create method", () => {
    const dto = new CreateUserDto();
    usersController.create(dto);
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  })

});

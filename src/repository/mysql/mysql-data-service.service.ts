import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDataService } from 'src/core/abstracts';
import { UserEntity } from './entities/user.entity';
import { MySqlBaseRepository } from './mysql-base-repository';
import { UserRepository } from './user.repository';

@Injectable()
export class MySqlDataService
  implements BaseDataService, OnApplicationBootstrap
{
  users: MySqlBaseRepository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  onApplicationBootstrap() {
    this.users = this.userRepository;
  }
}

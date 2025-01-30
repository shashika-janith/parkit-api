import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { MySqlBaseRepository } from './mysql-base-repository';
import { UserRepository } from './user.repository';
import { BaseDataService } from 'src/core/abstracts';

@Injectable()
export class MySqlDataService
  implements BaseDataService, OnApplicationBootstrap
{
  users: MySqlBaseRepository<UserEntity>;

  constructor(private userRepository: UserRepository) {}

  onApplicationBootstrap() {
    this.users = this.userRepository;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { MySqlBaseRepository } from './mysql-base-repository';

@Injectable()
export class UserRepository extends MySqlBaseRepository<UserEntity> {
  constructor(
    @Inject('USER_REPOSITORY') private repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  override async getAll(
    page: number,
    limit: number,
  ): Promise<[UserEntity[], number]> {
    return this.repository.findAndCount({
      take: limit, // Number of records per page
      skip: (page - 1) * limit, // Offset calculation
      order: { createdAt: 'DESC' }, // Sorting order
    });
  }
}

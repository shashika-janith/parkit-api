import { Repository } from 'typeorm';
import { MySqlBaseRepository } from './mysql-base-repository';
import { BaseRepository } from 'src/core/abstracts';
import { UserEntity } from './entities/user.entity';

export class UserRepository
  extends MySqlBaseRepository<UserEntity>
  implements BaseRepository<UserEntity>
{
  constructor(repository: Repository<UserEntity>) {
    super(repository);
  }

  override async create(data: UserEntity): Promise<UserEntity> {
    try {
      return data;
    } catch (error) {}
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MySqlBaseRepository } from './mysql-base-repository';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoriteRepository extends MySqlBaseRepository<FavoriteEntity> {
  constructor(
    @Inject('FAVORITE_REPOSITORY')
    private repository: Repository<FavoriteEntity>,
  ) {
    super(repository);
  }
}

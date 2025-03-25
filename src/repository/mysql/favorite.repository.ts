import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { UserEntity } from './entities/user.entity';
import { MySqlBaseRepository } from './mysql-base-repository';

@Injectable()
export class FavoriteRepository extends MySqlBaseRepository<FavoriteEntity> {
  constructor(
    @Inject('FAVORITE_REPOSITORY')
    private favRepository: Repository<FavoriteEntity>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {
    super(favRepository);
  }

  async filterByUser(
    page: number,
    limit: number,
    userId: number,
  ): Promise<[Promise<FavoriteEntity[]>, Promise<number>]> {
    // const user = this.userRepository.findOne({ where: { id: userId } });
    // const res = await this.favRepository.find({ where: { user: user } });

    const queryBuilder = this.favRepository
      .createQueryBuilder('favorites')
      .leftJoin('favorites.user', 'user')
      .leftJoin('favorites.parkingArea', 'parkingArea')
      .where('favorites.userId = :userId', { userId: userId })
      .addSelect([
        'favorites.id AS id',
        'user.id AS userId',
        'parkingArea.id as entityId',
        'parkingArea.phone AS phone',
        'parkingArea.address AS address',
        'parkingArea.type AS type',
        'parkingArea.rate AS rate',
        'parkingArea.security AS security',
        'ST_Y(parkingArea.coordinates) AS latitude',
        'ST_X(parkingArea.coordinates) AS longitude',
        'parkingArea.capacity AS capacity',
        'parkingArea.occupiedSlots AS occupiedSlots',
      ])
      .skip((page - 1) * limit)
      .take(limit);

    const result = queryBuilder.getRawMany();
    const count = queryBuilder.getCount();

    return [result, count];
  }
}

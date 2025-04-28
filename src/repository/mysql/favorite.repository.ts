import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { UserEntity } from './entities/user.entity';
import { MySqlBaseRepository } from './mysql-base-repository';

@Injectable()
export class FavoriteRepository extends MySqlBaseRepository<FavoriteEntity> {
  constructor(
    @Inject('FAVORITE_REPOSITORY')
    private favRepository: Repository<FavoriteEntity>,
  ) {
    super(favRepository);
  }

  async filterByUser(
    page: number,
    limit: number,
    userId: number,
  ): Promise<[Promise<FavoriteEntity[]>, Promise<number>]> {
    const queryBuilder = this.favRepository
      .createQueryBuilder('favorites')
      .select([
        'favorites.id AS id',
        'parkingArea.id as entityId',
        'parkingArea.phone AS phone',
        'parkingArea.address AS address',
        'parkingArea.type AS type',
        'parkingArea.rate AS hourlyRate',
        'parkingArea.security AS security',
        'ST_Y(parkingArea.coordinates) AS latitude',
        'ST_X(parkingArea.coordinates) AS longitude',
        'parkingArea.capacity AS capacity',
        'parkingArea.occupiedSlots AS occupiedSlots',
      ])
      .where('favorites.userId = :userId', { userId: userId })
      .leftJoin('favorites.parkingArea', 'parkingArea')
      .limit(limit)
      .offset((page - 1) * limit);

    const result = queryBuilder.getRawMany();
    const count = queryBuilder.getCount();

    return [result, count];
  }

  /**
   * Deletes a specific parking area entry for a user based on the given user ID and parking area ID.
   *
   * @param {number} userId - The ID of the user for whom the parking area entry will be deleted.
   * @param {number} parkingAreaId - The ID of the parking area that needs to be deleted for the user.
   *
   * @returns {Promise<DeleteResult>} A promise that resolves with the result of the deletion operation.
   */
  async deleteByParkingAreaIdAndUserId(
    userId: number,
    parkingAreaId: number,
  ): Promise<DeleteResult> {
    const queryBuilder = this.favRepository
      .createQueryBuilder('favorites')
      .where('favorites.userId = :userId', { userId: userId })
      .andWhere('favorites.parkingAreaId = :parkingAreaId', {
        parkingAreaId: parkingAreaId,
      })
      .delete();

    const result = queryBuilder.execute();

    return result;
  }
}

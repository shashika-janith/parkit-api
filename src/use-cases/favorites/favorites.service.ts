import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataService } from '../../repository/mysql/mysql-data-service.service';
import { FavoriteEntity } from '../../repository/mysql/entities/favorite.entity';
import { FavoriteDto } from 'src/core/dtos/favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private dataService: DataService) {}

  async createOne(userId: number, parkingAreaId: number): Promise<any> {
    try {
      const [userRes, parkingAreaRes] = await Promise.all([
        this.dataService.users.findById(userId),
        this.dataService.parkingAreas.findById(parkingAreaId),
      ]);

      const entity = new FavoriteEntity();
      entity.user = userRes;
      entity.parkingArea = parkingAreaRes;

      return this.dataService.favorites.create(entity);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Filters favorites by current user.
   * @param {number} page Current page.
   * @param {number} limit Page size.
   * @param {number} userId User id.
   */
  async filterByUser(
    page: number,
    limit: number,
    userId: number,
  ): Promise<any> {
    try {
      const [entitiesPromise, totalPromise] =
        await this.dataService.favorites.filterByUser(page, limit, userId);

      return Promise.all([entitiesPromise, totalPromise]).then(
        ([entities, count]) => {
          const data = entities.map((entity) => {
            const fav = new FavoriteDto();
            fav.fromJson(entity);

            return fav;
          });

          return {
            data,
            total: count,
            currentPage: page,
            pageSize: limit,
            totalPages: Math.ceil(count / limit),
          };
        },
      );
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

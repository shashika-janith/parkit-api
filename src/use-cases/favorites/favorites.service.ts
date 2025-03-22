import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataService } from '../../repository/mysql/mysql-data-service.service';
import { FavoriteEntity } from '../../repository/mysql/entities/favorite.entity';

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
      entity.paringArea = parkingAreaRes;

      return this.dataService.favorites.create(entity);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

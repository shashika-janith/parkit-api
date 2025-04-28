import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteEntityResponseDto } from 'src/core/dtos/delete-entity-response-dto';
import { FavoriteDto } from 'src/core/dtos/favorite.dto';
import { ParkingAreaDto } from 'src/core/dtos/parking-area.dto';
import { ResponseDto } from 'src/core/dtos/response.dto';
import { FavoriteEntity } from '../../repository/mysql/entities/favorite.entity';
import { DataService } from '../../repository/mysql/mysql-data-service.service';
import { ErrorMessage } from 'src/constants/error-message';
import { Error } from 'src/enum/error.enum';

@Injectable()
export class FavoritesService {
  constructor(private dataService: DataService) {}

  /**
   * Creates a new favorite record linking a user to a parking area.
   *
   * - Fetches the user and parking area entities by their respective IDs.
   * - Creates a new `FavoriteEntity` associating the user and parking area.
   * - Persists the favorite entity into the database.
   * - Returns a structured `ResponseDto` containing parking area details upon success.
   *
   * @param {number} userId - The ID of the user who is marking a parking area as favorite.
   * @param {number} parkingAreaId - The ID of the parking area being added to favorites.
   * @returns A promise that resolves to a `ResponseDto` containing the created parking area details.
   *
   * @throws {HttpException} Throws an internal server error (500) if any operation fails during creation.
   */
  async createOne(
    userId: number,
    parkingAreaId: number,
  ): Promise<ResponseDto<ParkingAreaDto>> {
    try {
      const [userRes, parkingAreaRes] = await Promise.all([
        this.dataService.users.findById(userId),
        this.dataService.parkingAreas.findById(parkingAreaId),
      ]);

      // Throws an exception if not found.
      if (!parkingAreaRes) {
        throw new NotFoundException(ErrorMessage[Error.PARKING_AREA_NOT_FOUND]);
      }

      const entity = new FavoriteEntity();
      entity.user = userRes;
      entity.parkingArea = parkingAreaRes;

      await this.dataService.favorites.create(entity);

      const response: ResponseDto<ParkingAreaDto> = {
        status: true,
        message: 'Favorite created successfully',
        data: {
          id: parkingAreaRes.id,
          name: parkingAreaRes.name,
          phone: parkingAreaRes.phone,
          address: parkingAreaRes.address,
          latitude: parkingAreaRes.latitude,
          longitude: parkingAreaRes.longitude,
          type: parkingAreaRes.type,
          rate: parkingAreaRes.rate,
          capacity: parkingAreaRes.capacity,
          occupiedSlots: parkingAreaRes.occupiedSlots,
          security: [parkingAreaRes.security],
        },
      };

      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Deletes a record based on the provided `userId` and `parkingAreaId`.
   *
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} parkingAreaId - The ID of the parking area.
   * @returns {Promise<ResponseDto<DeleteEntityResponseDto>>} A promise that resolves when the deletion is complete.
   */
  async deleteByParkingAreaIdAndUserId(
    userId: number,
    parkingAreaId: number,
  ): Promise<ResponseDto<DeleteEntityResponseDto>> {
    try {
      const result =
        await this.dataService.favorites.deleteByParkingAreaIdAndUserId(
          userId,
          parkingAreaId,
        );

      if (result.affected > 0) {
        const response = {
          status: true,
          message: 'Favorite created successfully',
          data: { id: parkingAreaId },
        };

        return response;
      }

      if (result.affected === 0) {
        throw new NotFoundException('Favorite item not found');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Filters favorites by current user.
   *
   * @async
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

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateParkingAreaDto } from 'src/core/dtos/create-parking-area.dto';
import { ParkingAreaDto } from 'src/core/dtos/parking-area.dto';
import { ParkingArea } from 'src/core/entities/parking-area.entity';
import { DataService } from 'src/repository/mysql/mysql-data-service.service';

@Injectable()
export class ParkingAreasService {
  constructor(private dataService: DataService) {}

  async filterNearby(
    page: number,
    limit: number,
    latitude: number,
    longitude: number,
  ): Promise<any> {
    try {
      const [entitiesPromise, totalPromise] =
        await this.dataService.parkingAreas.filterNearby(
          page,
          limit,
          latitude,
          longitude,
        );

      return Promise.all([entitiesPromise, totalPromise]).then(
        ([entities, count]) => {
          const data = entities.map((entity) => {
            const area = new ParkingArea();
            area.id = entity.id;
            area.name = 'Test Parking Area';
            area.phone = entity.phone;
            area.address = entity.address;
            area.rate = entity.rate;
            area.latitude = entity.latitude;
            area.longitude = entity.longitude;
            area.type = entity.type;
            area.security = entity.security;
            area.occupiedSlots = entity.occupiedSlots;
            area.availableSlots = entity.availableSlots;

            return area;
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

  /**
   * Filters parking areas by current user.
   * @param {number} page Current page.
   * @param {number} limit Page size.
   * @param {number} userId User id.
   */
  async filterByUser(
    page: number,
    limit: number,
    userId: number,
  ): Promise<any> {
    const [entitiesPromise, totalPromise] =
      await this.dataService.parkingAreas.filterByUser(page, limit, userId);

    return Promise.all([entitiesPromise, totalPromise]).then(
      ([entities, count]) => {
        const data = entities.map((entity) => {
          const area = new ParkingArea();
          area.id = entity.id;
          area.phone = entity.phone;
          area.address = entity.address;
          area.rate = entity.rate;
          area.latitude = entity.latitude;
          area.longitude = entity.longitude;
          area.type = entity.type;
          area.security = entity.security;
          area.occupiedSlots = entity.occupiedSlots;
          area.availableSlots = entity.availableSlots;
          return area;
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
  }

  /**
   * Creates a parking area.
   * @param {CreateParkingAreaDto} createAreaDto Parking area data.
   * @param {number} userId User id.
   * @returns Promise<ParkingArea>
   */
  async create(
    createAreaDto: CreateParkingAreaDto,
    userId: number,
  ): Promise<ParkingArea> {
    try {
      const res = await this.dataService.parkingAreas.createOne(
        createAreaDto,
        userId,
      );

      if (res.identifiers.length) {
        const entity = await this.dataService.parkingAreas.findById(
          res.identifiers[0].id,
        );

        const area = new ParkingArea();
        area.id = entity.id;
        area.phone = entity.phone;
        area.address = entity.address;
        area.rate = entity.rate;
        area.latitude = entity.latitude;
        area.longitude = entity.longitude;
        area.type = entity.type;
        area.security = entity.security;
        area.occupiedSlots = entity.occupiedSlots;
        area.availableSlots = entity.availableSlots;

        return area;
      }
    } catch (error) {
      Logger.error(error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number): Promise<ParkingAreaDto> {
    try {
      const res = await this.dataService.parkingAreas.findById(id);
      return res;
    } catch (error) {
      Logger.error(error);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

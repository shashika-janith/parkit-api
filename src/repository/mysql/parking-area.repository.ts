import { Inject, Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import { ParkingAreaEntity } from './entities/parking-area.entity';
import { MySqlBaseRepository } from './mysql-base-repository';
import { CreateParkingAreaDto } from 'src/core/dtos/create-parking-area.dto';

@Injectable()
export class ParkingAreaRepository extends MySqlBaseRepository<ParkingAreaEntity> {
  constructor(
    @Inject('PARKING_AREA_REPOSITORY')
    private repository: Repository<ParkingAreaEntity>,
  ) {
    super(repository);
  }

  async createOne(
    dto: CreateParkingAreaDto,
    userId: number,
  ): Promise<InsertResult> {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(ParkingAreaEntity)
      .values({
        ...dto,
        coordinates: () =>
          `ST_GeomFromText('POINT(${dto.longitude} ${dto.latitude})', 4326)`,
        user: {
          id: userId,
        },
      })
      .execute();
  }

  override async findById(id: number): Promise<any> {
    return this.repository
      .createQueryBuilder()
      .select([
        'id',
        'phone',
        'address',
        'type',
        'rate',
        'availableSlots',
        'occupiedSlots',
        'security',
        'ST_X(coordinates) AS longitude',
        'ST_Y(coordinates) AS latitude',
      ])
      .where('id = :id', { id })
      .getRawOne();
  }

  async filter(
    page: number,
    limit: number,
    latitude: string,
    longitude: string,
  ): Promise<[Promise<any[]>, Promise<number>]> {
    const radius = 2000; // Distance in meters.

    const queryBuilder = this.repository
      .createQueryBuilder()
      .select([
        'id',
        'phone',
        'address',
        'type',
        'rate',
        'availableSlots',
        'occupiedSlots',
        'security',
        'ST_X(coordinates) AS longitude',
        'ST_Y(coordinates) AS latitude',
      ])
      .where(
        `ST_Distance_Sphere(
          coordinates, 
          ST_GeomFromText(:point, 4326)
        ) <= :radius`,
      )
      .setParameters({
        point: `POINT(${longitude} ${latitude})`,
        radius: radius,
      })
      .skip((page - 1) * limit)
      .take(limit);

    const result = queryBuilder.getRawMany();
    const count = queryBuilder.getCount();

    return [result, count];
  }
}

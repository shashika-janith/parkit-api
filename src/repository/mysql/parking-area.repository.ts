import { Inject, Injectable } from '@nestjs/common';
import { InsertResult, Repository, SelectQueryBuilder } from 'typeorm';
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

  private buildQuery(): SelectQueryBuilder<ParkingAreaEntity> {
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
      ]);
  }

  /**
   * Creates a new parking area DB record.
   * @param dto - Data Transfer Object containing the details of the parking area to be created.
   * @param userId - The ID of the user creating the parking area record.
   * @returns The newly created parking area record.
   */
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

  /**
   * Retrieves a parking area record from the database by its unique identifier.
   * @param id - The unique identifier of the record to retrieve.
   * @returns A Promise that resolves to the record if found, or `null` if no record matches the provided ID.
   */
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

  async filterByUser(
    page: number,
    limit: number,
    userId: number,
  ): Promise<[Promise<any[]>, Promise<number>]> {
    const queryBuilder = this.buildQuery()
      .where('userId = :userId', { userId })
      .skip((page - 1) * limit)
      .take(limit);

    const result = queryBuilder.getRawMany();
    const count = queryBuilder.getCount();

    return [result, count];
  }

  async filterNearby(
    page: number,
    limit: number,
    latitude: number,
    longitude: number,
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

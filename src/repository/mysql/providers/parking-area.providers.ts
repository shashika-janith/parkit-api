import { DataSource } from 'typeorm';
import { ParkingAreaEntity } from '../entities/parking-area.entity';

export const parkingAreaProviders = [
  {
    provide: 'PARKING_AREA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ParkingAreaEntity),
    inject: ['DATA_SOURCE'],
  },
];

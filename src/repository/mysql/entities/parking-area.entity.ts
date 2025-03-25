import { AreaType } from 'src/enum/area-type.enum';
import { SafetySecurity } from 'src/enum/safety-security.enum';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { FavoriteEntity } from './favorite.entity';
import { UserEntity } from './user.entity';

@Entity('parking_areas')
export class ParkingAreaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 250 })
  address: string;

  @Index({ spatial: true })
  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 })
  coordinates: string;

  @Column({ type: 'set', enum: AreaType })
  type: AreaType;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  rate: number;

  @Column({ type: 'smallint', default: 0 })
  capacity: number;

  @Column({ type: 'smallint', default: 0 })
  occupiedSlots: number;

  @Column({ type: 'set', enum: SafetySecurity, default: SafetySecurity.NONE })
  security: SafetySecurity[];

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.parkingAreas)
  user: UserEntity;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.parkingArea)
  favorites: FavoriteEntity[];
}

import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ParkingAreaEntity } from './parking-area.entity';
import { UserEntity } from './user.entity';

@Entity('favorites')
export class FavoriteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingAreaEntity, (parkingArea) => parkingArea.favorites)
  @JoinColumn()
  parkingArea: ParkingAreaEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  @JoinColumn()
  user: UserEntity;
}

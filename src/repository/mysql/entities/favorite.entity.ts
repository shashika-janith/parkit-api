import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ParkingAreaEntity } from './parking-area.entity';
import { UserEntity } from './user.entity';

@Entity('favorites')
export class FavoriteEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ParkingAreaEntity)
  @JoinColumn()
  paringArea: ParkingAreaEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}

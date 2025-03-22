import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { BaseDataService } from 'src/core/abstracts';
import { ParkingAreaRepository } from './parking-area.repository';
import { UserRepository } from './user.repository';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class DataService implements BaseDataService, OnApplicationBootstrap {
  users: UserRepository;
  parkingAreas: ParkingAreaRepository;
  favorites: FavoriteRepository;

  constructor(
    private userRepository: UserRepository,
    private parkingAreaRepository: ParkingAreaRepository,
    private favoriteRepository: FavoriteRepository,
  ) {}

  onApplicationBootstrap() {
    this.users = this.userRepository;
    this.parkingAreas = this.parkingAreaRepository;
    this.favorites = this.favoriteRepository;
  }
}

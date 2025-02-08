import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { BaseDataService } from 'src/core/abstracts';
import { ParkingAreaRepository } from './parking-area.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class DataService implements BaseDataService, OnApplicationBootstrap {
  users: UserRepository;
  parkingAreas: ParkingAreaRepository;

  constructor(
    private userRepository: UserRepository,
    private parkingAreaRepository: ParkingAreaRepository,
  ) {}

  onApplicationBootstrap() {
    this.users = this.userRepository;
    this.parkingAreas = this.parkingAreaRepository;
  }
}

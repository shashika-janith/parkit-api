import { Module } from '@nestjs/common';
import { BaseDataService } from 'src/core/abstracts';
import { DatabaseModule } from './database.module';
import { DataService } from './mysql-data-service.service';
import { userProviders } from './providers/user.providers';
import { UserRepository } from './user.repository';
import { parkingAreaProviders } from './providers/parking-area.providers';
import { ParkingAreaRepository } from './parking-area.repository';
import { favoriteProviders } from './providers/favorite.providers';
import { FavoriteRepository } from './favorite.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserRepository,
    ...parkingAreaProviders,
    ParkingAreaRepository,
    ...favoriteProviders,
    FavoriteRepository,
    {
      provide: BaseDataService,
      useClass: DataService,
    },
    DataService, // Explicitly providing DataService to access any custom method in repositories.
  ],
  exports: [BaseDataService, DataService],
})
export class MySqlDataServiceModule {}

import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../repository/data-service.module';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from '../../controllers/favorites.controller';

@Module({
  imports: [DataServicesModule],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}

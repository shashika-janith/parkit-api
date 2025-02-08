import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/repository/data-service.module';
import { ParkingAreasService } from './parking-areas.service';
import { ParkingAreasController } from 'src/controllers/parking-areas.controller';

@Module({
  imports: [DataServicesModule],
  providers: [ParkingAreasService],
  controllers: [ParkingAreasController],
  exports: [ParkingAreasService],
})
export class ParkingAreasModule {}

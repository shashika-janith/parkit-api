import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AuthModule } from './auth/auth.module';
import { DataServicesModule } from './repository/data-service.module';
import { ParkingAreasModule } from './use-cases/parking-spots/parking-areas.module';
import { UsersModule } from './use-cases/users/users.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    DataServicesModule,
    AuthModule,
    UsersModule,
    ParkingAreasModule,
  ],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataServicesModule } from 'src/repository/data-service.module';

@Module({
  imports: [DataServicesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

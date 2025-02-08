import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DataServicesModule } from 'src/repository/data-service.module';
import { UsersController } from 'src/controllers/users.controller';

@Module({
  imports: [DataServicesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

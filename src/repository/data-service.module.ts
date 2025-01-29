import { Module } from '@nestjs/common';
import { MySqlDataServiceModule } from './mysql/mysql-data-service.module';

@Module({
  imports: [MySqlDataServiceModule],
  exports: [MySqlDataServiceModule],
})
export class DataServicesModule {}

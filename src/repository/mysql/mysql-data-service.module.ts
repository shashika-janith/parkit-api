import { Module } from '@nestjs/common';
import { BaseDataService } from 'src/core/abstracts';
import { DatabaseModule } from './database.module';
import { MySqlDataService } from './mysql-data-service.service';
import { userProviders } from './providers/user.providers';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserRepository,
    {
      provide: BaseDataService,
      useClass: MySqlDataService,
    },
  ],
  exports: [BaseDataService],
})
export class MySqlDataServiceModule {}

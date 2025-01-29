import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseDataService } from 'src/core/abstracts';
import { MySqlDataService } from './mysql-data-service.service';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'parkit',
      entities: [UserEntity],
    }),
  ],
  providers: [
    {
      provide: BaseDataService,
      useClass: MySqlDataService,
    },
  ],
  exports: [BaseDataService],
})
export class MySqlDataServiceModule {}

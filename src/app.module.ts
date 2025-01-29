import { Module } from '@nestjs/common';
import { DataServicesModule } from './repository/data-service.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './controllers/user.controller';
import { UsersModule } from './use-cases/users/users.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    DataServicesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}

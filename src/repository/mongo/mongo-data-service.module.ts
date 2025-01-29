import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { MongoDataService } from './mongo-data-service.service';
import { BaseDataService } from 'src/core/abstracts';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://eco-bin-admin:APirNSOxfhh4TfK2@dev-eco-bin.epir2.mongodb.net/?retryWrites=true&w=majority&appName=dev-eco-bin',
    ),
  ],
  providers: [
    {
      provide: BaseDataService,
      useClass: MongoDataService,
    },
  ],
  exports: [BaseDataService],
})
export class MongoDataServiceModule {}

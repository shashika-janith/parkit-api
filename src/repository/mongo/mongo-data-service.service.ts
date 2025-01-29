import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDataService, BaseRepository } from 'src/core/abstracts';
import { User, UserDocument } from './models/user.model';
import { MongoRepository } from './mongo-repository';

@Injectable()
export class MongoDataService
  implements BaseDataService, OnApplicationBootstrap
{
  users: BaseRepository<User>;

  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<UserDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoRepository<User>(this.userRepository);
  }
}

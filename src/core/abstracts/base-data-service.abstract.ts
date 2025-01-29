import { User } from '../entities/user.entity';
import { BaseRepository } from './base-repository.abstract';

export abstract class BaseDataService {
  abstract users: BaseRepository<User>;
}

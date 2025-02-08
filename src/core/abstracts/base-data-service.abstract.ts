import { BaseRepository } from './base-repository.abstract';

export abstract class BaseDataService<T = unknown> {
  abstract users: BaseRepository<T>;
  abstract parkingAreas: BaseRepository<T>;
}

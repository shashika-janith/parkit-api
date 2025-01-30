import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/abstracts';

export class MongoRepository<T> implements BaseRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  findOneBy(params: { [k: string]: string }): Promise<T> {
    throw new Error('Method not implemented.');
  }

  create(data: T): Promise<T> {
    return this._repository.create(data);
  }

  update(data: T): Promise<T> {
    return this._repository.findByIdAndUpdate(data);
  }

  delete(id: number): Promise<void> {
    return this._repository.findByIdAndDelete(id);
  }

  findById(id: number): Promise<T> {
    return this._repository.findById(id).exec();
  }

  getAll(page: number, limit: number): Promise<[T[], number]> {
    throw new Error('Method not implemented.');
  }

  findOne(query: any): Promise<T> {
    return this._repository.findOne(query).exec();
  }
}

import { BaseRepository } from 'src/core/abstracts';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './entities/base.entity';

export abstract class MySqlBaseRepository<T extends BaseEntity>
  implements BaseRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  create(data: T): Promise<T> {
    const record = this._repository.create(data);
    console.log('Rec', record);
    return record.save();
  }

  async update(data: T): Promise<T> {
    return this._repository.save(data);
  }

  async delete(id: number): Promise<void> {
    this._repository.delete(id);
  }

  async findById(id: number): Promise<T> {
    return this._repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  async findOneBy(params: { [k: string]: string }): Promise<T> {
    return this._repository.findOne({
      where: { ...params } as FindOptionsWhere<T>,
    });
  }

  async getAll(): Promise<T[]> {
    return this._repository.find();
  }
}

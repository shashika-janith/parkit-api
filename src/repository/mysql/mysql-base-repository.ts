import { BaseRepository } from 'src/core/abstracts';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './entities/base.entity';

export abstract class MySqlBaseRepository<T extends BaseEntity>
  implements BaseRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async create(data: T): Promise<T> {
    const record = this._repository.create(data);
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

  async getAll(
    page: number,
    limit: number,
    order: FindOptionsOrder<T>,
  ): Promise<[T[], number]> {
    return this._repository.findAndCount({
      order,
      take: limit, // Number of records per page
      skip: (page - 1) * limit, // Offset calculation
    });
  }
}

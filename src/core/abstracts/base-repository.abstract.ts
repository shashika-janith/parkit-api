export abstract class BaseRepository<T> {
  abstract create(data: T): Promise<T>;
  abstract update(data: T): Promise<T>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<T>;
  abstract findOneBy(params: { [k: string]: string }): Promise<T>;
  abstract getAll(page: number, limit: number): Promise<[T[], number]>;
}

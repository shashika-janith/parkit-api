import { DataSource } from 'typeorm';
import { FavoriteEntity } from '../entities/favorite.entity';

export const favoriteProviders = [
  {
    provide: 'FAVORITE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FavoriteEntity),
    inject: ['DATA_SOURCE'],
  },
];

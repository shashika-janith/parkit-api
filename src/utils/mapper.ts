import { User } from 'src/core/entities/user.entity';
import { UserEntity } from 'src/repository/mysql/entities/user.entity';

export class Mapper {
  static toUser(entity: UserEntity): User {
    const user = new User();
    user.email = entity.email;
    user.phone = entity.phone;
    user.firstName = entity.firstName;
    user.lastName = entity.lastName;
    user.isActive = entity.isActive;
    user.createdAt = entity.createdAt;
    user.updatedAt = entity.updatedAt;

    return user;
  }
}

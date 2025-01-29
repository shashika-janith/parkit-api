import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BaseDataService } from 'src/core/abstracts';
import { CreateUserDto } from '../../core/dtos/create-user.dto';
import { UserEntity } from 'src/repository/mysql/entities/user.entity';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private dataService: BaseDataService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust the number of salt rounds
    return bcrypt.hash(password, saltRounds);
  }

  // async findOneById(userId: number): Promise<User | undefined> {
  //     try {
  //         return this.userRepository.findOneBy({ id: userId });
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const res = await this.dataService.users.findOneBy({ email });

      if (res) {
        const user = new User();
        user.email = res.email;
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.phone = res.phone;

        return user;
      }

      return undefined;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const userEntity = new UserEntity();
    userEntity.email = createUserDto.email;
    userEntity.firstName = createUserDto.firstName;
    userEntity.lastName = createUserDto.lastName;
    userEntity.password = hashedPassword;
    userEntity.phone = createUserDto.phone;

    try {
      const res = await this.dataService.users.create(userEntity);

      if (res) {
        const user = new User();
        user.id = res.id;
        user.email = res.email;
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.phone = res.phone;

        return user;
      }
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

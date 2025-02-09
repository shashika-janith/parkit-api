import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/core/entities/user.entity';
import { UserEntity } from 'src/repository/mysql/entities/user.entity';
import { DataService } from 'src/repository/mysql/mysql-data-service.service';
import { Mapper } from 'src/utils/mapper';
import { QueryFailedError } from 'typeorm';
import { CreateUserDto } from '../../core/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private dataService: DataService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust the number of salt rounds
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Finds a user by email address.
   * @param {string} email Email address.
   * @returns Promise<User | undefined>
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const res = await this.dataService.users.findOneBy({ email });

      if (res) {
        const user = new User();
        user.id = res.id;
        user.email = res.email;
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.phone = res.phone;
        user.password = res.password;

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

  /**
   * Filter the users.
   * @param page Current page.
   * @param limit Page size.
   * @returns Promise<any>
   */
  async filter(page: number, limit: number): Promise<any> {
    try {
      const [entities, total] = await this.dataService.users.getAll(
        page,
        limit,
      );

      const users = entities.map((entity) => Mapper.toUser(entity));

      return {
        data: users,
        total,
        currentPage: page,
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Creates a new user.
   * @param {CreateUserDto} createUserDto User data.
   * @returns Promise<User>
   */
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

      if (
        error instanceof QueryFailedError &&
        'ER_DUP_ENTRY' === error.driverError.code
      ) {
        throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

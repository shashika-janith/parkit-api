import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/core/entities/user.entity';
import { UsersService } from 'src/use-cases/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private usersService: UsersService,
    @Inject() private jwtService: JwtService,
  ) {}

  async login(user: any) {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../core/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/use-cases/users/users.service';
import { CreateUserResDto } from 'src/core/dtos/create-user-res.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    const resDto = new CreateUserResDto();
    resDto.id = user.id;
    resDto.firstName = user.firstName;
    resDto.lastName = user.lastName;
    resDto.email = user.email;
    resDto.phone = user.phone;

    return resDto;
  }
}

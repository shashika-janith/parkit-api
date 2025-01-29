import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/use-cases/users/users.service';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.findOneByEmail(req.user.email);

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}

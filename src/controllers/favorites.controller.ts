import { Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoritesService as FavoritesService } from 'src/use-cases/favorites/favorites.service';

@Controller('favorite')
export class FavoritesController {
  constructor(private service: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Query('parkingAreaId') parkingAreaId: number) {
    const area = await this.service.createOne(req.user.userId, parkingAreaId);
    return area;
  }
}

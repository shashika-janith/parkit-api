import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
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

  /**
   * Filters the favorites by current user.
   * @param req Request object.
   * @param pageNo Current page.
   * @param pageSize Page size.
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('filter')
  async filterParkingAreas(
    @Request() req,
    @Query('pageNo') pageNo: string,
    @Query('pageSize') pageSize: string,
  ) {
    const res = await this.service.filterByUser(
      parseInt(pageNo),
      parseInt(pageSize),
      req.user.userId,
    );
    return res;
  }
}

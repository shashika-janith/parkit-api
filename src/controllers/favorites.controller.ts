import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoritesService } from 'src/use-cases/favorites/favorites.service';

@Controller('favorite')
export class FavoritesController {
  constructor(private service: FavoritesService) {}

  /**
   * Adds a parking area to the current user's list of favorites.
   *
   * @param {Request} req - The incoming HTTP request containing user authentication info.
   * @param {number} parkingAreaId - The ID of the parking area to be added to favorites.
   * @returns The favorite parking area entry.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Query('parkingAreaId') parkingAreaId: number) {
    const area = await this.service.createOne(req.user.userId, parkingAreaId);
    return area;
  }

  /**
   * Deletes a parking area from the current user's list of favorites.
   *
   * @param {Request} req - The incoming HTTP request containing user authentication info.
   * @param {number} parkingAreaId - The ID of the parking area to be added to favorites.
   * @returns The favorite parking area entry.
   */
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Request() req, @Query('parkingAreaId') parkingAreaId: number) {
    const area = await this.service.deleteByParkingAreaIdAndUserId(
      req.user.userId,
      parkingAreaId,
    );
    return area;
  }

  /**
   * Filters the favorites by current user.
   * @param {Request} req Request object.
   * @param {number} pageNo Current page.
   * @param {number} pageSize Page size.
   * @returns The filtered favorites.
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

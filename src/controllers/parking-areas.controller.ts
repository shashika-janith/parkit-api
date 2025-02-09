import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateParkingAreaDto } from 'src/core/dtos/create-parking-area.dto';
import { FilterParkingAreasDto } from 'src/core/dtos/filter-parking-areas.dto';
import { ParkingAreasService } from 'src/use-cases/parking-spots/parking-areas.service';

@Controller('area')
export class ParkingAreasController {
  constructor(private service: ParkingAreasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() dto: CreateParkingAreaDto) {
    const area = await this.service.create(dto, req.user.userId);
    return area;
  }

  /**
   * Filters nearby parking areas.
   * @param {FilterParkingAreasDto} dto Request payload.
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('filter')
  async filterNearByParkingAreas(@Body() dto: FilterParkingAreasDto) {
    const res = await this.service.filterNearby(
      dto.pageNo,
      dto.pageSize,
      dto.latitude,
      dto.longitude,
    );

    return res;
  }

  /**
   * Filters the parking areas by current user.
   * @param req Request object.
   * @param pageNo Current page.
   * @param pageSize Page size.
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('me/filter')
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

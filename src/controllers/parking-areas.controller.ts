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

  @UseGuards(JwtAuthGuard)
  @Get('filter')
  async filterUsers(
    @Query('pageNo') pageNo: string,
    @Query('pageSize') pageSize: string,
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ) {
    const res = await this.service.filter(
      parseInt(pageNo),
      parseInt(pageSize),
      latitude,
      longitude,
    );

    return res;
  }
}

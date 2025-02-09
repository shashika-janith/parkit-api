import { IsOptional, IsString, IsIn, IsNotEmpty } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class FilterParkingAreasDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;
}

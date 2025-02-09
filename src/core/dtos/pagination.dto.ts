import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNo: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number;
}

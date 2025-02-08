import { IsNotEmpty } from 'class-validator';
import { AreaType } from 'src/enum/area-type.enum';
import { SafetySecurity } from 'src/enum/safety-security.enum';

export class CreateParkingAreaDto {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  type: AreaType;

  @IsNotEmpty()
  rate: number;

  @IsNotEmpty()
  availableSlots: number;

  @IsNotEmpty()
  security: SafetySecurity[];
}

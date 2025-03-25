import { AreaType } from 'src/enum/area-type.enum';
import { SafetySecurity } from 'src/enum/safety-security.enum';

export class ParkingAreaDto {
  id: number;
  name: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
  type: AreaType;
  rate: number;
  capacity: number;
  occupiedSlots: number;
  security: SafetySecurity[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

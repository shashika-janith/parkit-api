import { AreaType } from 'src/enum/area-type.enum';
import { SafetySecurity } from 'src/enum/safety-security.enum';

export class ParkingArea {
  id: number;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
  type: AreaType;
  rate: number;
  availableSlots: number;
  occupiedSlots: number;
  security: SafetySecurity[];
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

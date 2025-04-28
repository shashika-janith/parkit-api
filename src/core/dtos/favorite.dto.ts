import { AreaType } from 'src/enum/area-type.enum';
import { SafetySecurity } from 'src/enum/safety-security.enum';

export class FavoriteDto {
  id: number;
  entityId: number;
  name: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
  type: AreaType;
  hourlyRate: number;
  capacity: number;
  occupiedSlots: number;
  security: SafetySecurity[];
  createdAt?: Date;
  updatedAt?: Date;

  fromJson(data: any) {
    this.id = data['id'];
    this.entityId = data['entityId'];
    this.name = data['name'];
    this.phone = data['phone'];
    this.address = data['address'];
    this.latitude = data['latitude'];
    this.longitude = data['longitude'];
    this.type = data['type'];
    this.hourlyRate = data['hourlyRate'];
    this.capacity = data['capacity'];
    this.occupiedSlots = data['occupiedSlots'];
    this.security = data['security']?.split(',') || [];
  }
}

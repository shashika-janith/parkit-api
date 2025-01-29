export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

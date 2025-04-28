import { Error } from 'src/enum/error.enum';

export const ErrorMessage: Partial<{ [key in keyof typeof Error]: string }> = {
  [Error.PARKING_AREA_NOT_FOUND]: 'Parking area not found.',
};

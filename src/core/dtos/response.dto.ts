export class ResponseDto<T = void> {
  data?: T;
  status: boolean;
  message: string;
}

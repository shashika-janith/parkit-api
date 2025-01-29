import { BaseEmailService } from './base-email-service.abstract';

export abstract class BaseNotificationService {
  abstract email: BaseEmailService;
}

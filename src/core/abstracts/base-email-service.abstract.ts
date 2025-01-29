export abstract class BaseEmailService {
  abstract sendEmailFromTemplate(templateId: number, to: any[], params?: Object);
}

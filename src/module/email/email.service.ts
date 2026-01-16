import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface IEmailDataInterface {
  email: string;
  subject: string;
  text: string;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * @description 发送
   * @param data
   * @returns
   */
  async sendEmail(data: IEmailDataInterface) {
    try {
      const sendMailOptions: ISendMailOptions = {
        to: data.email,
        subject: data.subject,
        text: data.text,
      };
      await this.mailerService
        .sendMail(sendMailOptions)
        .then(() => {
          console.log(
            `发送邮件给:${data.email},成功!主题:${data.subject || '默认'}`,
          );
        })
        .catch((error) => {
          console.log(
            `发送邮件给:${data.email}出错!主题:${data.subject || '默认'}`,
            error,
          );
        });
      return { message: '发送成功' };
    } catch (error) {
      console.error('发送邮件出错:', error);
      return { error };
    }
  }
}

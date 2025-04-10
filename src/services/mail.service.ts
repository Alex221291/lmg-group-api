import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

  private transporter: nodemailer.Transporter;

  constructor() {
      this.transporter = nodemailer.createTransport({
          host: 'smtp.mail.ru',
          port: 465, // Mail.ru требует 465 с SSL или 587 с STARTTLS
          secure: true, // true для 465, false для 587
          auth: {
              user: process.env.SMTP_EMAIL,  // Укажите ваш email на Mail.ru
              pass: process.env.SMTP_PASSWORD // Пароль или специальный пароль приложения
          }
      });
  }

  async sendMail(email: string, subject: string, text: string): Promise<void> {
      const mailOptions = {
          from: process.env.SMTP_EMAIL,
          to: email,
          subject: subject,
          text: text,
      };

      try {
          console.log('Отправка письма:', mailOptions);
          await this.transporter.sendMail(mailOptions);
          console.log('Письмо успешно отправлено!');
      } catch (error) {
          console.error('Ошибка при отправке письма:', error);
      }
  }
  
    async sendMailYandex(email: string, subject: string, text: string): Promise<any> {
        const transporter = nodemailer.createTransport({
            service: 'Yandex',
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD,
            },
          });
        
          const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: subject,
            text: text,
          };
        
          try {
            console.log(mailOptions);
            await transporter.sendMail(mailOptions);
            console.log('Письмо успешно отправлено!');
          } catch (error) {
            console.error('Ошибка при отправке письма:', error);
          }
    }
}
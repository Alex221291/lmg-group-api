import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    async sendMail(email: string, subject: string, text: string): Promise<any> {
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
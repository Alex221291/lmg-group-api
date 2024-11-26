import {
    Controller,
    Post,
    Body,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostMailDto } from '../dto/mail/post-mail.dto';
import { MailService } from '../services/mail.service';
  
  @ApiTags('Mail')
  @Controller('mail')
  export class MailController {
    constructor(
      private readonly mailService: MailService
    ) {}

    
    @Post()
    async get(@Body() data: PostMailDto): Promise<any> {
      try {
        const text = `Имя: ${data?.name}
Телефон: ${data?.phone}`;

        await this.mailService.sendMail(process.env.MAIN_EMAIL, 'Форма для связи', text);
        return;
      } catch (error) {
        throw new Error('Ошибка при Отправке сообщения');
      }
    }
  }

  
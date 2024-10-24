import {
    Controller,
    Post,
    Body,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostMailDto } from 'src/dto/mail/post-mail.dto';
import { MailService } from 'src/services/mail.service';
  
  @ApiTags('Mail')
  @Controller('mail')
  export class MailController {
    constructor(
      private readonly mailService: MailService
    ) {}

    
    @Post()
    async get(@Body() data: PostMailDto): Promise<any> {
      try {
        const text = `name: ${data?.name}
phone: ${data?.phone}
email: ${data?.email}
question: ${data?.question}`;

        await this.mailService.sendMail(data?.email, 'Вы задали вопрос', text);
        await this.mailService.sendMail(process.env.MAIN_EMAIL, 'Вопрос клиента', text);

        return;
      } catch (error) {
        throw new Error('Ошибка при Отправке сообщения');
      }
    }
  }

  
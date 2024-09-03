import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDTO } from './dto/sendMail.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  createTransporter() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    return transporter;
  }

  async sendMail(data: SendMailDTO) {
    const { from, html, recipients, text, subject } = data;
    const transporter = this.createTransporter();

    const options: Mail.Options = {
      from: from
        ? from
        : {
            name: process.env.APP_NAME,
            address: process.env.APP_MAIL,
          },
      to: recipients,
      subject,
      html,
      text,
    };

    try {
      const result = await transporter.sendMail(options);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

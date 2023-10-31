import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    this.sendEmail();
  }
  async sendEmail() {
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({
      username: 'youredith',
      key: this.options.apiKey,
    });

    const messageData = {
      from: 'Excited User <mailgun@sandbox-123.mailgun.org>',
      to: ['youredith3@gmail.com'],
      subject: 'Hello',
      text: 'Testing some Mailgun awesomeness!',
      html: '<h1>Testing some Mailgun awesomeness!</h1>',
    };

    const response = await client.messages.create(
      this.options.domain,
      messageData,
    );
    console.log('response', response);
  }
}

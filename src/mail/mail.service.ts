import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  async sendEmail(subject: string, emailVars: EmailVar[]) {
    const mailgun = new Mailgun(formData);
    const mgClient = mailgun.client({
      username: 'youredith',
      key: this.options.apiKey,
    });

    const messageData = {
      from: `From DishDash <mailgun@${this.options.domain}>`,
      to: ['youredith3@gmail.com'],
      subject,
      html: '<h1>Testing some Mailgun awesomeness!</h1>',
    };
    console.log('mailgun', mailgun);

    emailVars.forEach((eVar) => {
      messageData[`v:${eVar.key}`] = eVar.value;
    });
    try {
      await mgClient.messages.create(this.options.domain, messageData);
    } catch (error) {
      console.log('error', error);
    }
  }
  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}

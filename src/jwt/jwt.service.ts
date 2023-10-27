import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  sign(userId: number): string {
    console.log('userID', userId);

    return jwt.sign({ id: userId }, this.options.privateKey);
  }
  verify(token: string) {
    console.log('verify', token);
    return jwt.verify(token, this.options.privateKey);
  }
}

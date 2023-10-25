import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    console.log('', this.jwtService.hello());
  }

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } });

      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }

      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      console.log('error', e);
      return { ok: false, error: "Couldn't create account" };
    }
  }
  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    //find the user with the email
    // check if the password is correct
    //make a JWT and give it to the user
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const passwordCorrect = await user.checkPassword(password);
      console.log('Password correctness:', passwordCorrect);

      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = jwt.sign({ id: user.id }, this.config.get('TOKEN_SECRET'));
      return {
        ok: true,
        token,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Wrong password',
      };
    }
  }
}

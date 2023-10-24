import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({ email, password, role }: CreateAccountInput) {
    //check if email not exist already
    try {
      const exists = await this.users.findOne({ where: { email } });

      if (exists) {
        //make error
        return;
      }
      await this.users.save(this.users.create({ email, password, role }));
      return true;
    } catch (e) {
      //make error
      return;
    }
    // hash the password
  }
}

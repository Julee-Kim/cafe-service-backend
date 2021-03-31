import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      // 이미 가입된 이메일이 있는지 확인
      const user = await this.users.findOne({
        email: createAccountInput.email,
      });
      if (user) {
        return {
          success: false,
          error: '해당 이메일을 가진 사용자가 이미 존재합니다.',
        };
      }

      // 유저 생성
      await this.users.save(this.users.create({ ...createAccountInput }));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '계정이 생성되지 않았습니다.',
      };
    }
  }
}

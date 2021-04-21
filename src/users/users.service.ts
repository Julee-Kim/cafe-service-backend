import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { GetProfileOutput } from './dtos/get-profile.dto';
import { UpdateUserInput, UpdateUserOutput } from './dtos/update-profile.dto';
import { UpdatePasswordInput, UpdatePasswordOutput } from './dtos/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private jwtService: JwtService,
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

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      // 이메일에 해당하는 유저가 있는지 확인
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );

      if (!user) {
        return {
          success: false,
          error: '이메일에 해당하는 사용자를 찾을 수 없습니다.',
        };
      }

      // 비밀번호가 맞는지 확인
      const isPasswordCurrent = await user.comparePassword(password);

      if (!isPasswordCurrent)
        return { success: false, error: '잘못된 비밀번호입니다.' };

      // 토큰 생성
      const payload = { id: user.id };
      const token = this.jwtService.sign(payload);

      return { success: true, token };
    } catch (error) {
      return {
        success: false,
        error: '로그인에 실패했습니다.',
      };
    }
  }

  async getProfile(id: number): Promise<GetProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ id });
      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        error: '유저를 찾지 못했습니다.',
      };
    }
  }

  async updateProfile(
    userId: number,
    updateUserInput: UpdateUserInput
  ): Promise<UpdateUserOutput> {
    try {
      const user = await this.users.findOneOrFail({ id: userId});

      const updateUser = {...user, ...updateUserInput};
      await this.users.save(updateUser);
      
      return {
        success: true,
        user: updateUser,
      };
    } catch (error) {
      return {
        success: false,
        error: '정보 수정을 실패했습니다.',
      };
    }
  }

  async updatePassword(
    userId: number,
    { password, newPassword }: UpdatePasswordInput
  ): Promise<UpdatePasswordOutput> {
    try {
      const user = await this.users.findOneOrFail({ id: userId });

      // 입력한 비밀번호와 db의 비밀번호가 일치하는지 확인
      const isPasswordCurrent = await user.comparePassword(password);

      if (!isPasswordCurrent) return { success: false, error: '현재 비밀번호가 일치하지 않습니다.' };

      user.password = newPassword;
      await this.users.save(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '비밀번호 변경을 실패했습니다.',
      };
    }
  }
}

import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Allow } from 'src/auth/allow.decorator';
import { AuthUser } from 'src/auth/authUser.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { GetProfileInput, GetProfileOutput } from './dtos/get-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => CreateAccountOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Query((returns) => User)
  @Allow('LoggedIn')
  getProfile(
    @AuthUser() authUser: User
  ): User {
    return authUser;
  }
}

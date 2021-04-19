import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from '@nestjs/graphql';
import { AllowedTypes } from './allow.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();

    const allow = this.reflector.get<AllowedTypes>('allowedType', context.getHandler());

    // allow 확인
    if(!allow) return true;
    
    if(allow === 'LoggedIn') {
      if(!gqlContext['user']) return false;

      return true;
    }
  }
}

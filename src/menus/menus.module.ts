import { Module } from '@nestjs/common';
import { MenuResolver } from './menus.resolver';

@Module({
  providers: [MenuResolver],
})
export class MenusModule {}

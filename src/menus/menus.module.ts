import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuResolver } from './menus.resolver';
import { MenuService } from './menus.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuResolver, MenuService],
})
export class MenusModule {}

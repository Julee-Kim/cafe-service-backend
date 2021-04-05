import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Menu } from './entities/menu.entity';
import { MenuResolver } from './menus.resolver';
import { MenuService } from './menus.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Category])],
  providers: [MenuResolver, MenuService],
})
export class MenusModule {}

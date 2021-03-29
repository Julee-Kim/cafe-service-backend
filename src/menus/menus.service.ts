import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuInput, CreateMenuOutput } from './dtos/create-menu.dto';
import { MenusOutput } from './dtos/get-menus.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menus: Repository<Menu>,
  ) {}

  async getMenus(): Promise<MenusOutput> {
    try {
      const menus = await this.menus.find();

      return {
        success: true,
        results: menus,
      };
    } catch (error) {
      return {
        success: false,
        error: '모든 메뉴를 가져오는데 실패했습니다.',
      };
    }
  }

  async createMenu(createMenuInput: CreateMenuInput): Promise<CreateMenuOutput> {
    try {
      const newMenu = this.menus.create(createMenuInput);
      await this.menus.save(newMenu);

      return {
        success: true,
        menuId: newMenu.id
      };
    } catch (error) {
      return {
        success: false,
        error: '메뉴 생성에 실패했습니다.',
      };
    }
  }
}

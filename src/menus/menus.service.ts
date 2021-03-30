import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuInput, CreateMenuOutput } from './dtos/create-menu.dto';
import { MenuInput, MenuOutput } from './dtos/get-menu.dto';
import { MenusOutput } from './dtos/get-menus.dto';
import { UpdateMenuInput, UpdateMenuOutput } from './dtos/update-menu.dto';
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

  async getMenu({ menuId }: MenuInput): Promise<MenuOutput> {
    try {
      const menu = await this.menus.findOne(menuId);

      if (!menu) {
        return {
          success: false,
          error: '메뉴를 찾을 수 없습니다.',
        };
      }

      return { success: true, menu };
    } catch (error) {
      return {
        success: false,
        error: '메뉴를 가져오는데 실패했습니다.',
      };
    }
  }

  async createMenu(
    createMenuInput: CreateMenuInput,
  ): Promise<CreateMenuOutput> {
    try {
      const newMenu = this.menus.create(createMenuInput);
      await this.menus.save(newMenu);

      return {
        success: true,
        menuId: newMenu.id,
      };
    } catch (error) {
      return {
        success: false,
        error: '메뉴 생성에 실패했습니다.',
      };
    }
  }

  async updateMenu(
    updateMenuInput: UpdateMenuInput,
  ): Promise<UpdateMenuOutput> {
    try {
      const menu = await this.menus.findOne(updateMenuInput.id);

      if (!menu) return { success: false, error: '존재하지 않는 메뉴입니다.' };

      await this.menus.save([updateMenuInput]);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: '메뉴 수정에 실패했습니다.',
      };
    }
  }
}

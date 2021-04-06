import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateMenuInput, CreateMenuOutput } from './dtos/create-menu.dto';
import { GetMenuInput, GetMenuOutput } from './dtos/get-menu.dto';
import { GetMenusOutput } from './dtos/get-menus.dto';
import { UpdateMenuInput, UpdateMenuOutput } from './dtos/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private readonly menus: Repository<Menu>,
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async getMenus(): Promise<GetMenusOutput> {
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

  async getMenu({ menuId }: GetMenuInput): Promise<GetMenuOutput> {
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
    console.log(createMenuInput.categoryId);
    try {
      const newMenu = this.menus.create(createMenuInput);

      const category = await this.categories.findOne(newMenu.categoryId);

      newMenu.category = category;
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
      const result = await this.getMenu({ menuId: updateMenuInput.menuId });

      if (result.success) {
        // 매장 정보 수정
        await this.menus.save([
          {
            id: updateMenuInput.menuId,
            ...updateMenuInput,
          },
        ]);

        return { success: true };
      } else {
        return result;
      }
    } catch (error) {
      return {
        success: false,
        error: '메뉴 수정에 실패했습니다.',
      };
    }
  }
}

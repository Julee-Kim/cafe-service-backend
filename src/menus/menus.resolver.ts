import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Menu } from './entities/menu.entity';
import { CreateMenuInput, CreateMenuOutput } from './dtos/create-menu.dto';
import { MenuService } from './menus.service';
import { MenusOutput } from './dtos/get-menus.dto';
import { UpdateMenuInput, UpdateMenuOutput } from './dtos/update-menu.dto';

@Resolver((of) => Menu)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query((returns) => MenusOutput)
  getMenus(): Promise<MenusOutput> {
    return this.menuService.getMenus();
  }

  @Mutation((returns) => CreateMenuOutput)
  createMenu(
    @Args('input') createMenuInput: CreateMenuInput,
  ): Promise<CreateMenuOutput> {
    return this.menuService.createMenu(createMenuInput);
  }

  @Mutation((returns) => UpdateMenuOutput)
  updateMenu(
    @Args('input') updateMenuInput: UpdateMenuInput,
  ): Promise<UpdateMenuOutput> {
    return this.menuService.updateMenu(updateMenuInput);
  }
}

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Menu } from './entities/menu.entity';
import { CreateMenuInput, CreateMenuOutput } from './dtos/create-menu.dto';
import { MenuService } from './menus.service';
import { GetMenusOutput } from './dtos/get-menus.dto';
import { UpdateMenuInput, UpdateMenuOutput } from './dtos/update-menu.dto';
import { GetMenuInput, GetMenuOutput } from './dtos/get-menu.dto';

@Resolver((of) => Menu)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query((returns) => GetMenusOutput)
  getMenus(): Promise<GetMenusOutput> {
    return this.menuService.getMenus();
  }

  @Query((returns) => GetMenuOutput)
  getMenu(@Args('input') getMenuInput: GetMenuInput): Promise<GetMenuOutput> {
    return this.menuService.getMenu(getMenuInput);
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

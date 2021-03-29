import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Menu } from './entities/menu.entity';
import { CreateMenuInput } from './dtos/create-menu.dto';

@Resolver((of) => Menu)
export class MenuResolver {
  @Query((returns) => [Menu])
  getMenus(@Args('product_name') product_name: string): Menu[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createMenu(@Args('input') createMenuInput: CreateMenuInput): boolean {
    console.log(createMenuInput);
    return true;
  }
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import {
  DeleteCategoryInput,
  DeleteCategoryOutput,
} from './dtos/delete-category.dto';
import { GetCategoriesOutput } from './dtos/get-categories.dto';
import { GetCategoryInput, GetCategoryOutput } from './dtos/get-category.dto';
import { Category } from './entities/category.entity';

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query((returns) => GetCategoriesOutput)
  getCategories(): Promise<GetCategoriesOutput> {
    return this.categoriesService.getCategories();
  }

  @Query((returns) => GetCategoryOutput)
  getCategory(
    @Args('input') getCategoryInput: GetCategoryInput,
  ): Promise<GetCategoryOutput> {
    return this.categoriesService.getCategory(getCategoryInput);
  }

  @Mutation((returns) => CreateCategoryOutput)
  createCategory(
    @Args('input') createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoriesService.createCategory(createCategoryInput);
  }

  @Mutation((type) => DeleteCategoryOutput)
  deleteCategory(
    @Args('input') deleteCategoryInput: DeleteCategoryInput,
  ): Promise<DeleteCategoryOutput> {
    return this.categoriesService.deleteCategory(deleteCategoryInput);
  }
}

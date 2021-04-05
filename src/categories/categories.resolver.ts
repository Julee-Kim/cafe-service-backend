import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { GetCategoriesOutput } from './dtos/get-categories.dto';
import { Category } from './entities/category.entity';

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query((returns) => GetCategoriesOutput)
  getCategories(): Promise<GetCategoriesOutput> {
    return this.categoriesService.getCategories();
  }

  @Mutation((returns) => CreateCategoryOutput)
  createCategory(
    @Args('input') createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoriesService.createCategory(createCategoryInput);
  }
}

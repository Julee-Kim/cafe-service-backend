import { Resolver, Query } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { GetCategoriesOutput } from './dtos/get-categories.dto';
import { Category } from './entities/category.entity';

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query((returns) => GetCategoriesOutput)
  getCategories(): Promise<GetCategoriesOutput> {
    return this.categoriesService.getCategories();
  }
}

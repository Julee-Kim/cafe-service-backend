import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCategoriesOutput } from './dtos/get-categories.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async getCategories(): Promise<GetCategoriesOutput> {
    try {
      const categories = await this.categories.find();
      return {
        success: true,
        categories,
      };
    } catch (error) {
      return {
        success: false,
        error: '',
      };
    }
  }
}

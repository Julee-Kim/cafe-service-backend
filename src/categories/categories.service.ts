import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
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
        error: '카테고리 목록 가져오기에 실패하였습니다.',
      };
    }
  }

  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    try {
      const newCategory = await this.categories.create(createCategoryInput);
      await this.categories.save(newCategory);

      return {
        success: true,
        categoryId: newCategory.id,
      };
    } catch (error) {
      return {
        success: false,
        error: '카테고리 생성에 실패하였습니다.',
      };
    }
  }
}

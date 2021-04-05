import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getCategory({
    categoryId,
  }: GetCategoryInput): Promise<GetCategoryOutput> {
    try {
      const category = await this.categories.findOne(categoryId);

      if (!category) {
        return {
          success: false,
          error: '카테고리를 찾을 수 없습니다.',
        };
      }

      return { success: true, category };
    } catch (error) {
      return {
        success: false,
        error: '카테고리를 가져오는데 실패했습니다.',
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

  async deleteCategory({
    categoryId,
  }: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    try {
      const category = await this.categories.findOne(categoryId);

      if (!category) {
        return {
          success: false,
          error: '존재하지 않는 카테고리입니다.',
        };
      }

      await this.categories.delete(categoryId);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '카테고리 삭제에 실패했습니다.',
      };
    }
  }
}

import {
  Field,
  InputType,
  Int,
  ObjectType,
  PickType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';

@InputType()
export class CreateCategoryInput extends PickType(Category, ['name']) {}

@ObjectType()
export class CreateCategoryOutput extends CoreOutput {
  @Field((type) => Int)
  categoryId?: number;
}

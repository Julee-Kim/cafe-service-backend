import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Menu } from '../entities/menu.entity';
import { CreateMenuInput } from './create-menu.dto';

@InputType()
export class UpdateMenuInput extends PartialType(CreateMenuInput) {
  @Field((type) => Int)
  menuId: number;
}

@ObjectType()
export class UpdateMenuOutput extends CoreOutput {}

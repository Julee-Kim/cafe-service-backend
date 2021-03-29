import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Menu } from '../entities/menu.entity';

@InputType()
export class UpdateMenuInput extends PartialType(Menu) {}

@ObjectType()
export class UpdateMenuOutput extends CoreOutput {}

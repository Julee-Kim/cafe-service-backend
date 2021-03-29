import { InputType, PartialType } from '@nestjs/graphql';
import { Menu } from '../entities/menu.entity';

@InputType()
export class CreateMenuInput extends PartialType(Menu) {}

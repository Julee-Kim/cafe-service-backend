import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Menu } from '../entities/menu.entity';

@InputType()
export class GetMenuInput {
  @Field((type) => Int)
  menuId: number;
}

@ObjectType()
export class GetMenuOutput extends CoreOutput {
  @Field((type) => Menu, { nullable: true })
  menu?: Menu;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Menu } from '../entities/menu.entity';

@ObjectType()
export class GetMenusOutput extends CoreOutput {
  @Field((type) => [Menu], { nullable: true })
  results?: Menu[];
}

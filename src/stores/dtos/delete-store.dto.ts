import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteStoreInput {
  @Field((type) => Int)
  storeId: number;
}

@ObjectType()
export class DeleteStoreOutput extends CoreOutput {}

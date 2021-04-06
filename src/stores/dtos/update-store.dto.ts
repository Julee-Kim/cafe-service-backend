import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateStoreInput } from './create-store.dto';

@InputType()
export class UpdateStoreInput extends PartialType(CreateStoreInput) {
  @Field((type) => Int)
  storeId: number;
}

@ObjectType()
export class UpdateStoreOutput extends CoreOutput {}

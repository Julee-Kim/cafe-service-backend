import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Store } from '../entities/store.entity';

@InputType()
export class CreateStoreInput extends PartialType(Store) {}

@ObjectType()
export class CreateStoreOutput extends CoreOutput {
  @Field((type) => Int, { nullable: true })
  storeId?: number;
}

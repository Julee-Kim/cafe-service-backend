import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Store } from '../entities/store.entity';

@InputType()
export class GetStoresInput {
  @Field((type) => Int, { nullable: true })
  sidoId?: number;

  @Field((type) => Int, { nullable: true })
  gugunId?: number;
}

@ObjectType()
export class GetStoresOutput extends CoreOutput {
  @Field((type) => [Store], { nullable: true })
  results?: Store[];
}

import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class DeleteCartItemsInput {
  @Field(type => [Int])
  menuIds: number[];
}

@ObjectType()
export class DeleteCartItemsOutput extends CoreOutput {}
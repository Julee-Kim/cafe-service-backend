import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class UpdateCartItemInput {
  @Field(type => Int)
  menuId: number;

  @Field(type => Int)
  qty: number;
}

@ObjectType()
export class UpdateCartItemOutput extends CoreOutput {}
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Cart } from "../entities/cart.entity";

@InputType()
export class UpdateCartItemQtyInput {
  @Field(type => Int)
  menuId: number;

  @Field(type => Int)
  qty: number;
}

@ObjectType()
export class UpdateCartItemQtyOutput extends CoreOutput {
  @Field(type => Cart)
  cart?: Cart;
}
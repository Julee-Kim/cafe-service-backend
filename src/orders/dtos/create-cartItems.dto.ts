import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Cart } from "../entities/cart.entity";

@InputType()
class CartItem {
  @Field(type => Number)
  menuId: number;

  @Field(type => Number)
  qty: number;
}

@InputType()
export class CreateCartItemsInput {
  @Field(type => [CartItem])
  items: CartItem[];
}

@ObjectType()
export class CreateCartItemsOutput extends CoreOutput {
  @Field(type => Cart)
  cart?: Cart;
}
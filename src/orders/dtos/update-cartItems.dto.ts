import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Cart, Item } from "../entities/cart.entity";

@InputType()
export class UpdateCartItemsInput {
  @Field(type => [Item])
  items: Item[];
}

@ObjectType()
export class UpdateCartItemsOutput extends CoreOutput {
  @Field(type => Cart)
  cart?: Cart;
}
import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Item } from "../entities/cart.entity";

@ObjectType()
export class GetCartItemsOutput extends CoreOutput {
  @Field((type) => [Item], { nullable: true })
  results?: Item[]
}
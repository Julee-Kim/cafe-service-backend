import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Item } from "../entities/cart.entity";

@InputType()
export class CreateCartItemInput extends PickType(Item, ['menuId', 'qty']) {}

@ObjectType()
export class CreateCartItemOutput extends CoreOutput {}
import { Field, InputType, ObjectType, OmitType, } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class UpdateUserInput extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'password',
]) {}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {
  @Field(type => User, {nullable: true})
  user?: User;
}
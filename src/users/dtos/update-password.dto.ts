import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

@InputType()
export class UpdatePasswordInput extends PickType(User, ['password']) {
  @Field(type => String)
  newPassword: string;
}

@ObjectType()
export class UpdatePasswordOutput extends CoreOutput {}
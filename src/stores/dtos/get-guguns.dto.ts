import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Gugun } from "../entities/gugun.entity";

@ObjectType()
export class GetGugunsOutput extends CoreOutput {
  @Field((type) => [Gugun], { nullable: true })
  results?: Gugun[];
}
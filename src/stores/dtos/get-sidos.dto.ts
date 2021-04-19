import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Sido } from "../entities/sido.entity";

@ObjectType()
export class GetSidosOutput extends CoreOutput {
  @Field((type) => [Sido], { nullable: true })
  results?: Sido[];
}
import { Field, InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Payment } from "../entities/payment.entity";

@InputType()
export class CreatePaymentInput extends OmitType(Payment, [
  'user',
  'id',
  'createdAt',
  'updatedAt'
]) {}

@ObjectType()
export class CreatePaymentOutput extends CoreOutput {}
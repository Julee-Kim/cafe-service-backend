import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Menu } from "src/menus/entities/menu.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, RelationId } from "typeorm";

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
class PaypalOrder {
  @Field(type => String, { nullable: true })
  billingToken?: string;

  @Field(type => String)
  facilitatorAccessToken: string;

  @Field(type => String)
  orderID: string;

  @Field(type => String)
  payerID: string;

  @Field(type => String, { nullable: true })
  paymentID?: string;

}

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  // user
  @Field(type => User)
  @JoinColumn()
  @ManyToOne(type => User, (user) => user.payment)
  user: User;

  // userId
  @RelationId((payment: Payment) => payment.user)
  userId: number;

  @Field(type => [Int])
  @Column('int', {array: true, nullable: true })
  menuIds?: number[];

  // data(from paypal)
  @Field(type => PaypalOrder)
  @Column({type: 'json'})
  data: PaypalOrder;

  @Field(type => String)
  @Column()
  receiverName: string;

  @Field(type => String)
  @Column()
  receiverPhone: string;

  @Field(type => String)
  @Column()
  receiverAddress: string;

  @Field(type => String)
  @Column()
  receiverAddressDetail: string;

  @Field(type => String)
  @Column()
  receiverZonecode: string;

  @Field(type => Int)
  @Column()
  totalPrice: number;

  @Field(type => Int)
  @Column()
  orderPrice: number;

  @Field(type => Int)
  @Column()
  deliveryPrice: number;

}
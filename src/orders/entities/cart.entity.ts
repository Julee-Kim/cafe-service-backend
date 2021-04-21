import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";

@InputType('ItemInputType', { isAbstract: true })
@ObjectType()
export class Item {
  @Field(type => Int)
  menuId: number;

  @Field(type => String)
  productName: string;

  @Field(type => String)
  img: string;

  @Field(type => Int)
  qty: number;

  @Field(type => Int)
  price: number;
}

@InputType('cartInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Cart extends CoreEntity {
  @Field((type) => User)
  @JoinColumn()
  @OneToOne(type => User, (user) => user.cart, {
    onDelete: 'SET NULL',
  })
  user: User;

  @Field((type) => Int)
  @RelationId((cart: Cart) => cart.user)
  userId: number;

  @Field((type) => [Item])
  @Column({type: 'json'})
  items: Item[];
}
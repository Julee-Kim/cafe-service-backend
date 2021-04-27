import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, RelationId } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cart } from 'src/orders/entities/cart.entity';
import { Payment } from 'src/orders/entities/payment.entity';

export enum Genders {
  F = 'F',
  M = 'M',
}

registerEnumType(Genders, { name: 'Genders' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  birth: string;

  @Field((type) => Genders)
  @Column({ type: 'enum', enum: Genders })
  @IsEnum(Genders)
  gender: Genders;

  @Field((type) => String)
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field((type) => String)
  @Column()
  @IsString()
  password: string;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  phone?: string;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  zonecode?: string;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  address?: string;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  addressDetail?: string;

  @Field(type => Cart, { nullable: true })
  @OneToOne(type => Cart, (cart) => cart.user, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  cart?: Cart;

  @RelationId((user: User) => user.cart)
  cartId: number;

  @Field(type => Payment, { nullable: true })
  @OneToMany(type => Payment, (payment) => payment.user, {
    cascade: true,
    onDelete: 'NO ACTION'
  })
  payment?: Payment;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async comparePassword(password): Promise<Boolean> {
    try {
      const isSame = await bcrypt.compare(password, this.password);
      return isSame;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}

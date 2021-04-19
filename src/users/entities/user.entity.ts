import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert()
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

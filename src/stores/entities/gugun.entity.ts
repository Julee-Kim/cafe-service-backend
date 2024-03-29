import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('GugunInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Gugun extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(10)
  name: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  sidoId: number;
}

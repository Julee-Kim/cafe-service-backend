import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('StoreInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Store extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  tel: string;

  @Field((type) => String)
  @Column()
  @IsString()
  sido: string;

  @Field((type) => String)
  @Column()
  @IsString()
  gugun: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  jibunAddress?: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  addressDetail?: string;

  @Field((type) => String)
  @Column()
  @IsString()
  zonecode: string;

  @Field((type) => String)
  @Column()
  @IsString()
  lat: string;

  @Field((type) => String)
  @Column()
  @IsString()
  lot: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  gugunId: number;
}

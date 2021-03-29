import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';

@InputType('MenuInputType', { isAbstract: true })
@ObjectType()
export class Menu {
  @Field((type) => String)
  @IsString()
  @Length(2)
  product_name: string;

  @Field((type) => String)
  @IsString()
  @Length(5)
  product_name_en: string;

  @Field((type) => String)
  @IsString()
  @Length(5)
  content: string;

  // @Field((type) => String)
  // @IsString()
  // @Length(5)
  // recommend: string;

  // @Field((type) => Int)
  // @IsNumber()
  // standard: number;

  // @Field((type) => Int)
  // @IsNumber()
  // kcal: number;

  // @Field((type) => Int)
  // @IsNumber()
  // sat_FAT: number;

  // @Field((type) => Int)
  // @IsNumber()
  // protein: number;

  // @Field((type) => Int)
  // @IsNumber()
  // sodium: number;

  // @Field((type) => Int)
  // @IsNumber()
  // sugars: number;

  // @Field((type) => Int)
  // @IsNumber()
  // caffeine: number;

  // @Field((type) => String)
  // @IsString()
  // img: string;
}

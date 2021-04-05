import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@InputType('MenuInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Menu extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(2)
  productName: string;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  productName_en: string;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  content: string;

  // @Field((type) => String)
  // @Column()
  // @IsString()
  // @Length(5)
  // recommend: string;

  // @Field((type) => Int, { defaultValue: 355 })
  // @Column()
  // @IsNumber()
  // standard: number;

  // @Field((type) => Int, { defaultValue: 0 })
  // @Column()
  // @IsNumber()
  // kcal: number;

  // @Field((type) => Int, { defaultValue: 0 })
  // @Column()
  // @IsNumber()
  // satFAT: number;

  // @Field((type) => Int, { defaultValue: 0 })
  // @Column()
  // @IsNumber()
  // protein: number;

  // @Field((type) => Int, { defaultValue: 0 })
  // @Column()
  // @IsNumber()
  // sodium: number;

  // @Field((type) => Int, { defaultValue: 0 })
  // @Column()
  // @IsNumber()
  // sugars: number;

  // @Field((type) => Int, { defaultValue: 0 })
  // @Column()
  // @IsNumber()
  // caffeine: number;

  // @Field((type) => String)
  // @Column()
  // @IsString()
  // img: string;

  @Field((type) => Category)
  @ManyToOne((type) => Category, (category) => category.menus, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  category: Category;

  @RelationId((menu: Menu) => menu.category)
  categoryId: number;
}

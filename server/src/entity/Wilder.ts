import { Field, InputType, ObjectType } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Grade from "./Grade";

@ObjectType()
class SkillOfWilder {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  votes: number;
}

@Entity()
@ObjectType()
class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100, type: "varchar" })
  city?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 100, type: "varchar" })
  avatarUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: "text" })
  bio?: string;

  @Field(() => [SkillOfWilder])
  skills?: SkillOfWilder[];

  @OneToMany(() => Grade, (g) => g.wilder)
  grades: Grade[];
}

@InputType()
export class SkillId {
  @Field()
  id: number;
}

@InputType()
export class WilderInput {
  @Field()
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @Field({ nullable: true })
  @MaxLength(100)
  city?: string;

  @Field({ nullable: true })
  @MaxLength(500)
  bio?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  avatarUrl?: string;

  @Field(() => [SkillId], { nullable: true })
  skills?: SkillId[];
}

export default Wilder;

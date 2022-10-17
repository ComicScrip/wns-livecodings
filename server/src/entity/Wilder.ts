import { MaxLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
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
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name?: string;

  @Column({ nullable: true, length: 100, type: "varchar" })
  @Field({ nullable: true })
  city?: string;

  @Column({ nullable: true, length: 100, type: "varchar" })
  @Field({ nullable: true })
  avatarUrl?: string;

  @Column({ length: 500, nullable: true, type: "text" })
  @Field({ nullable: true })
  bio?: string;

  @OneToMany(() => Grade, (g) => g.wilder)
  grades: Grade[];

  @Field(() => [SkillOfWilder])
  skills: SkillOfWilder[];
}

@InputType()
export class SkillId {
  @Field()
  id: number;
}

@InputType()
export class WilderInput {
  @MaxLength(100)
  @Field()
  name: string;

  @MaxLength(100)
  @Field({ nullable: true })
  city?: string;

  @MaxLength(100)
  @Field({ nullable: true })
  avatarUrl?: string;

  @MaxLength(500)
  @Field({ nullable: true })
  bio?: string;

  @Field(() => [SkillId], { nullable: true })
  skills?: SkillId[];
}

export default Wilder;

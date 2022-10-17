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
  @Field()
  city?: string;

  @Column({ nullable: true, length: 100, type: "varchar" })
  @Field()
  avatarUrl?: string;

  @Column({ length: 500, nullable: true, type: "text" })
  @Field()
  bio?: string;

  @OneToMany(() => Grade, (g) => g.wilder)
  grades: Grade[];

  @Field(() => [SkillOfWilder])
  skills: SkillOfWilder[];
}

@InputType()
export class WilderInput implements Partial<Wilder> {
  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  avatarUrl?: string;
}

export default Wilder;

import { argon2id, hash, verify } from "argon2";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  hashedPassword: string;

  @Column({ enum: ["visitor", "admin"], default: "visitor" })
  role: "visitor" | "admin";
}

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2id,
};

export const hashPassword = async (plainPassword: string): Promise<string> =>
  await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> =>
  await verify(hashedPassword, plainPassword, hashingOptions);

export default User;

import Counter from "./Counter";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstname: string;

  @OneToOne(() => Counter, (counter: Counter) => counter.user, {
    nullable: true,
  })
  counter?: Counter | null;
}

export default User;

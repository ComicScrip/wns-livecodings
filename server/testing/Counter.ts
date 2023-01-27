import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity()
class Counter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToOne(() => User, (user: User) => user.counter, { nullable: true })
  @JoinColumn()
  user?: User;
}

export default Counter;

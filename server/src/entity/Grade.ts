import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Skill from "./Skill";
import Wilder from "./Wilder";

@Entity()
class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  votes: number;

  @Column()
  skillId: number;

  @Column()
  wilderId: number;

  @ManyToOne(() => Wilder, (w) => w.grades, { onDelete: "CASCADE" })
  wilder: Wilder;

  @ManyToOne(() => Skill, (s) => s.grades, { onDelete: "CASCADE" })
  skill: Skill;
}

export default Grade;

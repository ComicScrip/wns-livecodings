import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import Grade from "./Grade";
@Entity ()
class Skill {
  @PrimaryGeneratedColumn()
  id: number 

  @Column()
   name: string;

   @OneToMany(()=> Grade, grade => grade.skill)
   grades: Grade[]
}

export default Skill
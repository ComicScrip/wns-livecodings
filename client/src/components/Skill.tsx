import styles from './Skill.module.css';

interface SkillProps {
  title: string;
  votes: number;
}

const Skill = ({ title, votes }: SkillProps) => {
  return (
    <li className={styles.skill}>
      {title}
      <span className={styles.votes}>{votes}</span>
    </li>
  );
};

export default Skill;

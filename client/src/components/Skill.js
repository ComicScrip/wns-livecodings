import styles from './Skill.module.css';

const Skill = ({ title, votes }) => {
  return (
    <li className={styles.skill}>
      {title}
      {/* <span className={styles.votes}>{votes}</span> */}
    </li>
  );
};

export default Skill;

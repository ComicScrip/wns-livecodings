import blank_profile from '../assets/avatar.png';
import Skill from './Skill';
import styles from './Wilder.module.css';

const Wilder = ({ name, skills = [] }) => {
  return (
    <article className={styles.card}>
      <img src={blank_profile} alt='Jane Doe Profile' />
      <h3>{name[0].toUpperCase() + name.split('').splice(1).join('')}</h3>
      <h4>Wild Skills</h4>
      <ul className={styles.skills}>
        {skills.map((skill, index) => (
          <Skill key={index} title={skill.name} votes={skill.votes} />
        ))}
      </ul>
    </article>
  );
};

export default Wilder;

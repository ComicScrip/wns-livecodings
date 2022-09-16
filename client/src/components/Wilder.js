import blank_profile from '../assets/avatar.png';
import {
  addSkillToWilder,
  deleteWilder,
  removeSkillFromWilder,
} from '../services/wilders';
import styles from './Wilder.module.css';
import Select from 'react-select';

const skillToOption = ({ name, id }) => ({ value: id, label: name });
const optionToSkill = ({ value, label }) => ({ id: value, name: label });

const Wilder = ({
  wilder: { id, name, skills = [] },
  setWilders,
  availableSkills,
}) => {
  const handleDelete = async () => {
    try {
      setWilders((oldList) => oldList.filter((wilder) => wilder.id !== id));
      await deleteWilder(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkillsChange = async (
    skills,
    { action, removedValues, removedValue, option }
  ) => {
    setWilders((currentList) =>
      currentList.map((wilder) => {
        if (wilder.id !== id) return wilder;
        return { ...wilder, skills: skills.map(optionToSkill) };
      })
    );

    if (action === 'select-option') await addSkillToWilder(id, option.value);
    else if (action === 'remove-value')
      await removeSkillFromWilder(id, removedValue.value);
    else if (action === 'clear')
      await Promise.all(
        removedValues.map((removed) => removeSkillFromWilder(id, removed.value))
      );
  };

  return (
    <article className={styles.card}>
      <img src={blank_profile} alt={name} />
      <h3>{name[0].toUpperCase() + name.split('').splice(1).join('')}</h3>
      <h4>Wild Skills</h4>
      <Select
        isMulti
        name='colors'
        options={availableSkills.map(skillToOption)}
        className='basic-multi-select'
        classNamePrefix='select'
        value={skills.map(skillToOption)}
        onChange={handleSkillsChange}
      />
      {/*
      <ul className={styles.skills}>
        {skills.map((skill, index) => (
          <Skill key={index} title={skill.name} />
        ))}
      </ul>   
      */}
      <br />
      <button onClick={handleDelete}>Delete</button>
    </article>
  );
};

export default Wilder;

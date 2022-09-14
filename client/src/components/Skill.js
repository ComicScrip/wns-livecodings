const Skill = ({ title, votes }) => {
  return (
    <li>
      {title}
      <span className='votes'>{votes}</span>
    </li>
  );
};

export default Skill;

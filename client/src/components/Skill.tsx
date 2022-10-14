import clsx from "clsx";
import { useMemo, useState } from "react";
import { updateGrade } from "../services/wilders";
import createPersistedState from "use-persisted-state";

interface SkillProps {
  title: string;
  votes: number;
  wilderId: number | string;
  skillId: number | string;
}

const Skill = ({ title, votes, wilderId, skillId }: SkillProps) => {
  const useVotedOnce = useMemo(
    () => createPersistedState(`${wilderId}-${skillId}`),
    [wilderId, skillId]
  );

  const [currentVotes, setCurrentVotes] = useState(votes);
  const [votedOnce, setVotedOnce] = useVotedOnce(false);
  const [isHovered, setIsHovered] = useState(false);
  const onClick = () => {
    updateGrade(wilderId, skillId, currentVotes + 1).then(() => {
      setVotedOnce(true);
      setCurrentVotes((c) => c + 1);
    });
  };

  return (
    <li
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={onClick}
      className={clsx(
        "transition-all duration-500 flex items-center mr-4 mb-3 bg-black/5 hover:bg-black/10 p-1 pl-2 pr-2 rounded-xl cursor-pointer border hover:border-black/5 ",
        (votedOnce || isHovered) && "scale-110"
      )}
    >
      {title}
      <div
        className={clsx(
          `items-center flex bg-black/30 text-white rounded-[9999px] h-[25px] pr-2 pl-2 justify-center ml-2 transition-all duration-1000`,
          (votedOnce || isHovered) && "bg-pink scale-105  "
        )}
      >
        <div
          style={{ rotate: isHovered || votedOnce ? "0deg x" : "360deg x" }}
          className={clsx(`transition-all duration-1000`)}
        >
          {isHovered && !votedOnce ? currentVotes + 1 : currentVotes}
        </div>
      </div>
    </li>
  );
};

export default Skill;

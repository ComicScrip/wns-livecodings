import React from "react";
import blank_profile from "../assets/avatar.png";
import { DELETE_WILDER, GET_WILDERS } from "../gql/wilders";
import Skill from "./Skill";
import { IWilder } from "../types/IWilder";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

interface WilderProps {
  wilder: IWilder;
}

const Wilder = ({
  wilder: { id, name, skills = [], avatarUrl },
}: WilderProps) => {
  const [deleteWilder] = useMutation(DELETE_WILDER, {
    refetchQueries: [{ query: GET_WILDERS }],
  });

  const handleDelete = async () => {
    if (window.confirm("are you sure ?"))
      try {
        await deleteWilder({ variables: { id: id.toString() } });
      } catch (err) {
        console.error(err);
      }
  };

  return (
    <>
      <div className="flex bg-white p-4 rounded-2xl mb-4 shadow-md">
        <Link to={`/wilders/${id}`}>
          <img
            src={avatarUrl || blank_profile}
            alt={name}
            className="h-16 w-16 rounded-full mr-6"
          />
        </Link>

        <div className="flex justify-between w-full  min-w-[200px]">
          <div className="flex flex-col">
            <Link to={`/wilders/${id}`}>
              <h3 className="font-semibold">
                {name[0].toUpperCase() + name.split("").splice(1).join("")}
              </h3>
            </Link>

            <ul className="flex flex-wrap">
              {skills
                .slice()
                .sort((a, b) => b.votes - a.votes)
                .map((skill, index) => (
                  <Skill
                    key={index}
                    title={skill.name}
                    votes={skill.votes}
                    wilderId={id}
                    skillId={skill.id}
                  />
                ))}
            </ul>
          </div>
          <div className="flex flex-col min-w-[40px]">
            <Link to={`/wilders/${id}/edit`}>
              <button className="mb-2 w-full">✏️</button>
            </Link>
            <button onClick={handleDelete}>x</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wilder;

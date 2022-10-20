import React from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import blank_profile from "../assets/avatar.png";
import Skill from "../components/Skill";
import { useWilderQuery } from "../gql/generated/schema";

export default function WilderDetails() {
  const { id = "" } = useParams();

  const { data } = useWilderQuery({
    variables: { wilderId: parseInt(id, 10) },
    skip: typeof id === "undefined",
  });
  const wilder = data?.wilder;

  if (!wilder)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const { avatarUrl, name, skills, city, bio } = wilder;

  return (
    <div className="p-4 pt-10 pb-10 flex flex-col items-center ">
      <>
        <div className="flex flex-col items-center">
          <img
            src={avatarUrl || blank_profile}
            alt={name}
            className="h-[50vw] w-[50vw] max-w-[300px] max-h-[300px] rounded-full mr-4 border-white border-[5px] shadow-md"
          />
          <h1 className="text-3xl pt-4 text-center font-semibold">{name}</h1>
          {city && <p className="text-center text-gray italic">from {city}</p>}
          <ul className="flex flex-wrap justify-center mt-8 mb-8">
            {skills.map((skill, index) => (
              <Skill
                key={index}
                title={skill.name}
                votes={skill.votes}
                wilderId={wilder.id}
                skillId={skill.id}
              />
            ))}
          </ul>
          {bio && <p className="text-justify">{bio}</p>}
        </div>
        <Link to={"edit"}>
          <button className="mt-8">Edit</button>
        </Link>
      </>
    </div>
  );
}

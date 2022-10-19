import React from "react";
import Loader from "../components/Loader";
import SkillForm from "../components/SkillForm.";
import { ISkill } from "../types/ISkill";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_SKILL, GET_SKILLS, UPDATE_SKILL } from "../gql/skills";

export default function SkillsAdmin() {
  const [parent] = useAutoAnimate<any>();

  const { loading, data, refetch } = useQuery(GET_SKILLS);
  const skills: ISkill[] = data?.skills || [];

  const [updateSkill] = useMutation(UPDATE_SKILL);
  const [deleteSkill] = useMutation(DELETE_SKILL);

  return (
    <div>
      <SkillForm onCreated={refetch} />
      <ul ref={parent}>
        {loading && !skills.length ? (
          <Loader />
        ) : (
          skills.map((s) => (
            <li key={s.id} className="flex justify-between mb-2">
              <input
                className="w-full mr-2"
                type="text"
                id="name"
                value={s.name}
                onChange={async (e) => {
                  const name = e.target.value;
                  if (name) {
                    await updateSkill({
                      variables: { data: { name }, id: s.id.toString() },
                    });

                    refetch();
                  }
                }}
              />

              <button
                onClick={async () => {
                  if (window.confirm("sure ?")) {
                    await deleteSkill({ variables: { id: s.id.toString() } });
                    refetch();
                  }
                }}
              >
                x
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

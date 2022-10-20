import React from "react";
import Loader from "../components/Loader";
import SkillForm from "../components/SkillForm.";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  useDeleteSkillMutation,
  useSkillsQuery,
  useUpdateSkillMutation,
} from "../gql/generated/schema";

export default function SkillsAdmin() {
  const [parent] = useAutoAnimate<any>();

  const { loading, data, refetch } = useSkillsQuery();
  const skills = data?.skills || [];

  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

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
                      variables: {
                        data: { name },
                        updateSkillId: s.id,
                      },
                    });

                    refetch();
                  }
                }}
              />

              <button
                onClick={async () => {
                  if (window.confirm("sure ?")) {
                    await deleteSkill({ variables: { deleteSkillId: s.id } });
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

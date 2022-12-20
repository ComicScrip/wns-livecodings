import React from "react";
import Loader from "../components/Loader";
import SkillForm from "../components/SkillForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  SkillsDocument,
  SkillsQuery,
  useDeleteSkillMutation,
  useSkillsQuery,
  useUpdateSkillMutation,
} from "../gql/generated/schema";
import client from "../gql/client";

export default function SkillsAdmin() {
  const [parent] = useAutoAnimate<any>();

  const { loading, data } = useSkillsQuery();
  const skills = data?.skills || [];

  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  return (
    <div>
      <SkillForm />
      <ul ref={parent}>
        {loading && !skills.length ? (
          <div className="p-2">
            <Loader />
          </div>
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
                    client.cache.updateQuery(
                      { query: SkillsDocument },
                      (query) => {
                        return {
                          ...query,
                          skills: (query as SkillsQuery).skills.map((sk) =>
                            s.id === sk.id ? { ...sk, name } : sk
                          ),
                        };
                      }
                    );
                    await updateSkill({
                      variables: {
                        data: { name },
                        updateSkillId: s.id,
                      },
                    });
                  }
                }}
              />

              <button
                onClick={async () => {
                  if (window.confirm("sure ?")) {
                    await deleteSkill({ variables: { deleteSkillId: s.id } });
                    client.cache.modify({
                      fields: {
                        skills(existing, { readField }) {
                          return (existing as SkillsQuery["skills"]).filter(
                            (sk) => readField("id", sk) !== s.id
                          );
                        },
                      },
                    });
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

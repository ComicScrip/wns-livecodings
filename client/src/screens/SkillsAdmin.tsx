import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import SkillForm from "../components/SkillForm.";
import { getAllSkills, deleteSkill, updateSkill } from "../services/skills";
import { ISkill } from "../types/ISkill";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(false);
  const [parent] = useAutoAnimate<any>();

  const fetchSkills = () => {
    setLoading(true);
    getAllSkills()
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <SkillForm setSkills={setSkills} />
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
                onChange={(e) => {
                  const name = e.target.value;
                  if (name) {
                    updateSkill(s.id, { name });
                  }
                  setSkills((old) =>
                    old.map((sk) => (s.id === sk.id ? { ...sk, name } : sk))
                  );
                }}
              />

              <button
                onClick={() => {
                  if (window.confirm("sure ?")) {
                    setSkills((old) => old.filter((sk) => s.id !== sk.id));
                    deleteSkill(s.id);
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

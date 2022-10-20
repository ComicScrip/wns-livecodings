import React, { useState, FormEvent, useRef } from "react";
import {
  SkillsDocument,
  useCreateSkillMutation,
} from "../gql/generated/schema";

export default function SkillForm() {
  const [name, setName] = useState("");
  const [createSkill, { loading: processing }] = useCreateSkillMutation();
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await createSkill({
      variables: { data: { name } },
      refetchQueries: [{ query: SkillsDocument }],
    });
    setName("");
    setTimeout(() => {
      nameRef.current?.focus();
    }, 50);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-4 pb-4 flex">
      <label htmlFor="name" className="mr-2">
        <span className="mr-3">Name</span>
        <input
          ref={nameRef}
          type="text"
          id="name"
          disabled={processing}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <button type="submit" disabled={processing}>
        +
      </button>
    </form>
  );
}

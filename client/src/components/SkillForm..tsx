import React, { useState, FormEvent, useRef } from "react";
import { ISkillInput } from "../types/ISkill";
import { useMutation } from "@apollo/client";
import { CREATE_SKILL } from "../gql/skills";

interface SkillFormProps {
  onCreated: () => any;
}

export default function SkillForm({ onCreated }: SkillFormProps) {
  const [name, setName] = useState<ISkillInput["name"]>("");

  const [createSkill, { loading: processing }] = useMutation(CREATE_SKILL);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await createSkill({ variables: { data: { name } } });
    setName("");
    onCreated();
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

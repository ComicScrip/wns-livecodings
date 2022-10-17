import React, {
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { createSkill } from "../services/skills";
import { ISkill, ISkillInput } from "../types/ISkill";
import toast from "react-hot-toast";

interface SkillFormProps {
  setSkills: Dispatch<SetStateAction<ISkill[]>>;
}

export default function SkillForm({ setSkills }: SkillFormProps) {
  const [name, setName] = useState<ISkillInput["name"]>("");
  const [processing, setProcessing] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setProcessing(true);
    try {
      await createSkill({ name });
      setSkills((old) => [
        ...old,
        {
          id: (old.slice().sort((a, b) => b.id - a.id)?.[0]?.id || 0) + 1,
          name,
        },
      ]);
      setName("");
    } catch (err) {
      console.error(err);
      if ((err as any)?.response?.status === 409) {
        toast.error("Duplicate name");
      }
    } finally {
      setProcessing(false);
      setTimeout(() => {
        nameRef.current?.focus();
      }, 50);
    }
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

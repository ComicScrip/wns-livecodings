import React, { useState, FormEvent, useRef } from "react";
import { CREATE_WILDER } from "../services/wilders";
import { IWilderInput } from "../types/IWilder";
import { useMutation } from "@apollo/client";

interface WilderFormProps {
  loadWildersIntoState: () => void;
}

export default function WilderForm({ loadWildersIntoState }: WilderFormProps) {
  const [name, setName] = useState<IWilderInput["name"]>("");
  const inputRef = useRef<any>();

  const [createWilder, { loading: processing }] = useMutation(CREATE_WILDER);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createWilder({ variables: { data: { name } } });
    loadWildersIntoState();
    setName("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <label htmlFor="name" className="mr-2">
        <span className="mr-3">Name</span>
        <input
          ref={inputRef}
          type="text"
          maxLength={30}
          id="name"
          disabled={processing}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <button type="submit" disabled={processing}>
        +
      </button>
      <br />
      <br />
    </form>
  );
}

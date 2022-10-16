import { useMutation } from "@apollo/client";
import React, { useState, FormEvent, useRef } from "react";
import { ADD_WILDER, createWilder } from "../services/wilders";
import { IWilderInput } from "../types/IWilder";

interface WilderFormProps {
  loadWildersIntoState: () => void;
}

export default function WilderForm({ loadWildersIntoState }: WilderFormProps) {
  const [name, setName] = useState<IWilderInput["name"]>("");
  const [createWilder, { loading: processing }] = useMutation(ADD_WILDER);

  const inputRef = useRef<any>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createWilder({ variables: { name } });
    setName("");
    loadWildersIntoState();
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

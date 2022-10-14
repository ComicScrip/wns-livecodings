import React, { useState, FormEvent, useRef } from "react";
import { createWilder } from "../services/wilders";
import { IWilderInput } from "../types/IWilder";

interface WilderFormProps {
  loadWildersIntoState: () => void;
}

export default function WilderForm({ loadWildersIntoState }: WilderFormProps) {
  const [name, setName] = useState<IWilderInput["name"]>("");
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<any>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await createWilder({ name });
      setName("");
      loadWildersIntoState();
      setTimeout(() => inputRef.current?.focus(), 100);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
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

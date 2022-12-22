import React, { useState, FormEvent, useRef } from "react";
import {
  useCreateWilderMutation,
  WildersDocument,
} from "../gql/generated/schema";

export default function WilderForm() {
  const [name, setName] = useState("");
  const inputRef = useRef<any>();

  const [createWilder, { loading: processing }] = useCreateWilderMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createWilder({
        variables: { data: { name } },
        refetchQueries: [{ query: WildersDocument }],
      });
    } catch (err) {
      console.error("eeee");
    }

    setName("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <label htmlFor="name" className="mr-2">
        <span className="mr-3">Name</span>
        <input
          data-testid="newWilderName"
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

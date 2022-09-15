import axios from 'axios';
import React, { useState } from 'react';
import { createWilder } from '../services/wilders';

export default function WilderForm({ loadWildersIntoState, setWilders }) {
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await createWilder({ name });
      console.log('wilder created', res.data);
      // setWilders((oldList) => [...oldList, res.data]);
      loadWildersIntoState();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Nom :{' '}
        <input
          type='text'
          id='name'
          disabled={processing}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <button type='submit' disabled={processing}>
        Ajouter
      </button>
    </form>
  );
}

import axios from 'axios';
import React, { useState } from 'react';

export default function WilderForm({ fetchWilders, setWilders }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/wilders', { name })
      .then((res) => {
        console.log('wilder created', res.data);
        fetchWilders();
        // setWilders((oldList) => [...oldList, res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Nom :{' '}
        <input
          type='text'
          id='name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <button type='submit'>Ajouter</button>
    </form>
  );
}

import { useState, FormEvent } from 'react';
import { createWilder } from '../services/wilders';
import { IWilderInput } from '../types/IWilder';

interface WilderFormProps {
  loadWildersIntoState: () => void;
}

export default function WilderForm({ loadWildersIntoState }: WilderFormProps) {
  const [name, setName] = useState<IWilderInput['name']>('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await createWilder({ name });
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
      <br />
      <br />
    </form>
  );
}

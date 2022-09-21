import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Wilder from './components/Wilder';
import WilderForm from './components/WilderForm';
import { getAllWilders } from './services/wilders';
import { IWilder } from './types/IWilder';

function App() {
  const [wilders, setWilders] = useState<IWilder[]>([]);
  const [loadingWilders, setLoadingWilders] = useState(false);

  const loadWildersIntoState = async () => {
    setLoadingWilders(true);
    try {
      setWilders(await getAllWilders());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWilders(false);
    }
  };

  useEffect(() => {
    loadWildersIntoState();
  }, []);

  return (
    <>
      <Header />
      <main className='container'>
        <WilderForm loadWildersIntoState={loadWildersIntoState} />
        <h2>Wilders</h2>
        <section className='card-row'>
          {loadingWilders
            ? 'Loading...'
            : wilders.map((wilder) => (
                <Wilder
                  key={wilder.id}
                  setWilders={setWilders}
                  wilder={wilder}
                />
              ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

import Wilder from './components/Wilder';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import WilderForm from './components/WilderForm';
import { getAllWilders } from './services/wilders';
import { getAllSkills } from './services/skills';

function App() {
  const [wilders, setWilders] = useState([]);
  const [loadingWilders, setLoadingWilders] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);

  const loadWildersIntoState = async () => {
    /*
    const res = await axios.get(
      'http://localhost:5000/wilders'
    );
    const wilders = res.data
    console.log(wilders);
    */
    setLoadingWilders(true);
    try {
      setWilders(await getAllWilders());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWilders(false);
    }
  };

  const loadAvailableSkillsIntoState = async () => {
    try {
      setAvailableSkills(await getAllSkills());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadWildersIntoState();
    loadAvailableSkillsIntoState();
  }, []);

  return (
    <>
      <Header />
      <main className='container'>
        <WilderForm
          loadWildersIntoState={loadWildersIntoState}
          setWilders={setWilders}
        />
        <h2>Wilders</h2>
        <section className='card-row'>
          {loadingWilders
            ? 'Loading...'
            : wilders.map((wilder) => (
                <Wilder
                  key={wilder.id}
                  setWilders={setWilders}
                  wilder={wilder}
                  availableSkills={availableSkills}
                />
              ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

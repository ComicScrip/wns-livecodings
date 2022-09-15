import Wilder from './components/Wilder';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import WilderForm from './components/WilderForm';

function App() {
  const [wilders, setWilders] = useState([]);

  const fetchWilders = async () => {
    /*
    const res = await axios.get(
      'http://localhost:5000/wilders'
    );
    const wilders = res.data
    console.log(wilders);
    */

    const { data: wilderList } = await axios.get(
      'http://localhost:5000/wilders'
    );
    setWilders(wilderList);
  };

  useEffect(() => {
    fetchWilders();
  }, []);

  return (
    <>
      <Header />
      <main className='container'>
        <WilderForm fetchWilders={fetchWilders} setWilders={setWilders} />
        <h2>Wilders</h2>
        <section className='card-row'>
          {wilders.map((wilder) => (
            <Wilder key={wilder.id} name={wilder.name} skills={wilder.skills} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

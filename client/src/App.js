import Wilder from './components/Wilder';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const wilders = [
    {
      id: 1,
      name: 'john',
      skills: [
        { id: 1, title: 'JS', votes: 4 },
        { id: 2, title: 'Python', votes: 3 },
        { id: 3, title: 'PHP', votes: 2 },
      ],
    },
    { id: 2, name: 'marc', skills: [{ id: 3, title: 'PHP', votes: 1 }] },
    {
      id: 3,
      name: 'lisa',
      skills: [
        { id: 3, title: 'PHP', votes: 5 },
        { id: 2, title: 'Python', votes: 2 },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className='container'>
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

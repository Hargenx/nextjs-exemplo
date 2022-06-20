import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState('');
  let changeHandler = (event) => {
    setTodo(event.target.value);
  };

  let addTodo = (event) => {
    setLoading(true);
    event.preventDefault();
    fetch('/api/criar?todo=' + todo)
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
  };

  let removeTodo = (rtodo) => {
    setLoading(true);
    fetch('/api/remover?todo=' + rtodo)
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
  };

  let loadTodos = () => {
    console.log('Carregando todo');
    fetch('/api/lista')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    loadTodos();
  }, []);

  if (!data) return 'Carregando.*.*.*.';
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js TODO APP</title>
        <meta name="description" content="Criado por Raphael" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className={styles.title}>
            TODO App feito com <a href="https://nextjs.org/">Next.js!</a>
            <br />
          </h1>
          {loading ? (
            <a href="#" className={styles.loader}>
              <img src="/load.gif" />
            </a>
          ) : (
            <form className={styles.cardForm} onSubmit={addTodo}>
              <input
                className={styles.cardInput}
                type="text"
                name="todo"
                onChange={changeHandler}
                placeholder="Digite o item..."
              />
              <br />
            </form>
          )}

          {data.map((item) => (
            <a
              href="#"
              onClick={() => removeTodo(item)}
              className={styles.card}
            >
              <p>{item}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Criado com{' '}
          <span className={styles.logo}>
            <Image
              src="/Nextjs-logo.svg"
              alt="Nextjs"
              width={100}
              height={50}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}

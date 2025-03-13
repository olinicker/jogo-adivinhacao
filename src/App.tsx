import styles from "./app.module.css";

import { Header } from "./components/Header";

export function App() {
  function handleRestartGame() {
    window.alert("jogo reiniciado!");
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={2888} max={10} onRestart={handleRestartGame} />
      </main>
    </div>
  );
}

import styles from "./app.module.css";

import { Input } from "./components/Input";
import { Tip } from "./components/Tip";
import { Button } from "./components/Button";
import { Letter } from "./components/Letter";
import { Header } from "./components/Header";
import { LettersUsed } from "./components/LettersUsed";

export function App() {
  function handleRestartGame() {
    window.alert("jogo reiniciado!");
  }
  return (
    <div className={styles.container}>
      <main>
        <Header current={2888} max={10} onRestart={handleRestartGame} />
        <Tip tip="Uma das linguagens de programação mais utilizadas"></Tip>

        <div className={styles.word}>
          <Letter value="R"></Letter>
          <Letter value="E"></Letter>
          <Letter value="A"></Letter>
          <Letter value="C"></Letter>
          <Letter value="T"></Letter>
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?"></Input>
          <Button title="Confirmar" />
        </div>

        <LettersUsed></LettersUsed>
      </main>
    </div>
  );
}

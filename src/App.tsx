import styles from "./app.module.css";
import { useEffect, useState } from "react";
import { WORDS, Challenge } from "./utils/words";

import { Input } from "./components/Input";
import { Tip } from "./components/Tip";
import { Button } from "./components/Button";
import { Letter } from "./components/Letter";
import { Header } from "./components/Header";
import { LettersUsed, LettersUsedProps } from "./components/LettersUsed";

export function App() {
  const [letter, setLetter] = useState("");
  const [attempts, setattempts] = useState(0);
  const [letterUsed, setLetterUsed] = useState<LettersUsedProps[]>([]);
  const [challange, setChallange] = useState<Challenge | null>(null);

  function handleRestartGame() {
    window.alert("jogo reiniciado!");
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallange(randomWord);
    setattempts(0);
  }

  function handleConfirm() {
    if (!challange) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra");
    }

    const value = letter.toUpperCase();
    const exists = letterUsed.find(
      (used) => used.value.toUpperCase() === value
    );

    if (exists) {
      return alert("Você já utilizou a letra " + value);
    }

    setLetterUsed((prevState) => [...prevState, { value, correct: false }]);
    setLetter("");
  }

  useEffect(() => {
    startGame();
  }, []);

  if (!challange) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={10} onRestart={handleRestartGame} />
        <Tip tip="Uma das linguagens de programação mais utilizadas"></Tip>

        <div className={styles.word}>
          {challange.word.split("").map(() => (
            <Letter value=""></Letter>
          ))}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          ></Input>
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LettersUsed data={letterUsed} />
      </main>
    </div>
  );
}

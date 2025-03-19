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
  const [score, setScore] = useState(0);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challange, setChallange] = useState<Challenge | null>(null);

  const ATTEMPT_MARGIN = 5;

  function handleRestartGame() {
    const isConfirmed = window.confirm("Você deseja mesmo reiniciar?");

    if (isConfirmed) {
      startGame();
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallange(randomWord);
    setScore(0);
    setLetter("");
    setLettersUsed([]);
  }

  function handleConfirm() {
    if (!challange) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra");
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value
    );

    if (exists) {
      setLetter("");
      return alert("Você já utilizou a letra " + value);
    }

    const hits = challange.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);
    setLetter("");
  }

  function endGame(message: string) {
    window.alert(message);
    startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challange) {
      return;
    }

    setTimeout(() => {
      if (score === challange.word.length) {
        return endGame("Parabéns, você descobriu a palavra");
      }

      const attemptLimit = challange.word.length + ATTEMPT_MARGIN;
      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena, você usou todas as tentativas :(");
      }
    }, 200);
  }, [score, lettersUsed.length]);

  if (!challange) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challange.word.length + ATTEMPT_MARGIN}
          onRestart={handleRestartGame}
        />
        <Tip tip={challange.tip}></Tip>

        <div className={styles.word}>
          {challange.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            );

            console.log(lettersUsed);

            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? "correct" : "default"}
              />
            );
          })}
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

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}

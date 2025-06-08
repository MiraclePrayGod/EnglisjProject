import React, { useState, useEffect } from 'react';
import './App.css';
import WordComponent from './components/WordComponent';
import TranslationComponent from './components/TranslationComponent';
import ScoreBoard from './components/ScoreBoard';
import { generateWords } from './utils/wordGenerator';
import { fetchTranslation } from './utils/translationAPI';

const App = () => {
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);

  // Generar palabras y traducirlas
  useEffect(() => {
    const newWords = generateWords(); // Genera un bloque de texto
    setWords(newWords);
  }, []);

  const handleTranslation = (correctTranslation) => {
    setScore(score + 1);
    // Mover la palabra al destino correcto con GSAP
  };

  return (
    <div className="game-container">
      <h1>Juego de Palabras</h1>
      <ScoreBoard score={score} />
      <div className="words-area">
        {words.map((word, index) => (
          <WordComponent key={index} word={word} onTranslate={handleTranslation} />
        ))}
      </div>
      <TranslationComponent words={words} onSelectTranslation={handleTranslation} />
    </div>
  );
};

export default App;

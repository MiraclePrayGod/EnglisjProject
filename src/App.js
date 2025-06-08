import React, { useState, useEffect } from 'react';
import './App.css';
import WordComponent from './components/WordComponent';
import TranslationComponent from './components/TranslationComponent';
import ScoreBoard from './components/ScoreBoard';
import RewardSystem from './components/RewardSystem';
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

  const handleTranslation = async (wordObj) => {
    try {
      const actual = await fetchTranslation(wordObj.word);
      if (actual.toLowerCase() === wordObj.translation.toLowerCase()) {
        setScore((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error obteniendo traducci\u00f3n', err);
    }
    // Mover la palabra al destino correcto con GSAP
  };

  return (
    <div className="game-container">
      <h1>Juego de Palabras</h1>
      <ScoreBoard score={score} />
      <RewardSystem score={score} />
      <div className="words-area">
        {words.map((word, index) => (
          <WordComponent key={index} word={word} />
        ))}
      </div>
      <TranslationComponent words={words} onSelectTranslation={handleTranslation} />
    </div>
  );
};

export default App;

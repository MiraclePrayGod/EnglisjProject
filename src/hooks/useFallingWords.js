import { useState, useRef } from 'react';

const useFallingWords = (SPAWN_INTERVAL, FALL_DURATION) => {
  const [inputEnglish, setInputEnglish] = useState('');
  const [inputSpanish, setInputSpanish] = useState('');
  const [allWords, setAllWords] = useState([]);
  const [fallingWords, setFallingWords] = useState([]);
  const [failedWords, setFailedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInputForm, setShowInputForm] = useState(true);

  const spawnIndex = useRef(0);
  const wordKeyCounter = useRef(0);

  const handleStartGame = () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    spawnIndex.current = 0;
    setShowInputForm(false);

    const englishWords = inputEnglish.trim().split(/\s+/);
    const spanishWords = inputSpanish.trim().split(/\s+/);

    if (englishWords.length !== spanishWords.length) {
      alert('Ambos bloques deben tener la misma cantidad de palabras.');
      setLoading(false);
      return;
    }

    const generatedWords = englishWords.map((word, idx) => ({
      id: idx + 1,
      word: word,
      translation: spanishWords[idx].toLowerCase(),
    }));

    setAllWords(generatedWords);
    setFallingWords([]);
    setLoading(false);
  };

  const handleMiss = (id) => {
    setFallingWords(fallingWords =>
      fallingWords.map(w => w.id === id ? { ...w, estado: 'exploded' } : w)
    );
    const missed = fallingWords.find(w => w.id === id);
    if (missed) setFailedWords(fw => [...fw, missed]);
    setTimeout(() => {
      setFallingWords(fallingWords => fallingWords.filter(w => w.id !== id));
    }, 700);
  };

  return {
    inputEnglish, setInputEnglish,
    inputSpanish, setInputSpanish,
    allWords, setAllWords,
    fallingWords, setFallingWords,
    failedWords, setFailedWords,
    score, setScore,
    gameOver, setGameOver,
    loading, setLoading,
    showInputForm, setShowInputForm,
    spawnIndex, wordKeyCounter,
    handleStartGame, handleMiss
  };
};

export default useFallingWords;

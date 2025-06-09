import { useEffect } from 'react';

const normalize = str =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const useGameKeyboard = ({
  allWords,
  fallingWords,
  gameOver,
  typed,
  setTyped,
  setLaserId,
  setScore,
  setResultMsg,
  setFallingWords,
  setShowLaser,
  handleMiss
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (allWords.length === 0 || gameOver) return;
      if (e.key === 'Enter') {
        const matchIdx = fallingWords.findIndex(
          w =>
            normalize(typed.trim()) === normalize(w.translation) &&
            w.estado === 'falling'
        );
        if (matchIdx !== -1) {
          const wordId = fallingWords[matchIdx].id;
          setLaserId(wordId);
          setShowLaser(true);
          setTimeout(() => setLaserId(null), 400);
          setScore(score => score + 1);
          setResultMsg('¡Correcto!');
          setTimeout(() => setResultMsg(''), 800);
          setFallingWords(fallingWords => fallingWords.filter(w => w.id !== wordId));
        } else {
          setResultMsg('Incorrecto');
          setTimeout(() => setResultMsg(''), 800);
        }
        setTyped('');
      } else if (e.key.length === 1) {
        setTyped(prev => prev + e.key);
      } else if (e.key === 'Backspace') {
        setTyped(prev => prev.slice(0, -1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fallingWords, typed, allWords.length, gameOver]);
};

export default useGameKeyboard;

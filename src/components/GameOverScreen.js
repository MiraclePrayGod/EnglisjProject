import React from 'react';
import ScoreBoard from './ScoreBoard';
import RewardSystem from './RewardSystem';

const GameOverScreen = ({
  score,
  failedWords,
  setAllWords,
  setFailedWords,
  setInputEnglish,
  setInputSpanish
}) => (
  <div className="game-container">
    <h1>Word Hero</h1>
    <ScoreBoard score={score} />
    <RewardSystem points={score} />
    {failedWords.length > 0 && (
      <div>
        <h3>Palabras fallidas:</h3>
        <ul>
          {failedWords.map((w, idx) => (
            <li key={w.id + '-' + idx}>
              <b>{w.word}</b> &rarr; {w.translation}
            </li>
          ))}
        </ul>
      </div>
    )}
    <button onClick={() => {
      setAllWords([]);
      setFailedWords([]);
      setInputEnglish('');
      setInputSpanish('');
    }}>
      Jugar de nuevo
    </button>
  </div>
);

export default GameOverScreen;

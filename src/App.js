import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import WordComponent from './components/WordComponent';
import Cannon from './components/Cannon';
import ScoreSidebar from './components/ScoreSidebar';
import Laser from './components/Laser';
import RewardSystem from './components/RewardSystem';
import WordInputForm from './components/WordInputForm';

const SPAWN_INTERVAL = 3000;
const FALL_DURATION = 10000;

const App = () => {
  const [inputEnglish, setInputEnglish] = useState('');
  const [inputSpanish, setInputSpanish] = useState('');
  const [allWords, setAllWords] = useState([]);
  const [fallingWords, setFallingWords] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [laserId, setLaserId] = useState(null);
  const [typed, setTyped] = useState('');
  const [failedWords, setFailedWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultMsg, setResultMsg] = useState('');
  const [showInputForm, setShowInputForm] = useState(true);
  const [showLaser, setShowLaser] = useState(false);

  const spawnIndex = useRef(0);
  const spawnInterval = useRef(null);
  const wordKeyCounter = useRef(0);

  const getWordX = useCallback((id) => {
    const min = 120;
    const max = window.innerWidth - 320;
    const base = Math.floor(min + ((max - min) * (0.5 + 0.45 * Math.sin(id * 1.7))));
    return base + ((id % 3) * 40) + 90;
  }, []);

  const cannonX = laserId ? getWordX(laserId) : window.innerWidth / 2;
  const cannonY = window.innerHeight - 100;

  const getLaserTargetTop = () => {
    const wordElem = document.querySelector(`[data-word-id="${laserId}"]`);
    if (wordElem) {
      const rect = wordElem.getBoundingClientRect();
      return rect.top + rect.height / 2 + window.scrollY;
    }
    return (window.innerHeight - 220) - 120 + 40;
  };

  useEffect(() => {
    if (!loading && allWords.length > 0 && !gameOver) {
      spawnInterval.current = setInterval(() => {
        setFallingWords(prev => {
          if (spawnIndex.current < allWords.length) {
            wordKeyCounter.current += 1;
            const nextWord = {
              ...allWords[spawnIndex.current],
              estado: 'falling',
              key: wordKeyCounter.current
            };
            spawnIndex.current += 1;
            return [...prev, nextWord];
          } else {
            clearInterval(spawnInterval.current);
            return prev;
          }
        });
      }, SPAWN_INTERVAL);
    }
    return () => clearInterval(spawnInterval.current);
  }, [allWords, loading, gameOver]);

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
          setShowLaser(true);
          setTimeout(() => setShowLaser(false), 200);
          setScore(score => score + 1);
          setResultMsg('¡Correcto!');
          setTimeout(() => setResultMsg(''), 800);
          setFallingWords(fallingWords => fallingWords.filter(w => w.id !== fallingWords[matchIdx].id));
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

  useEffect(() => {
    if (allWords.length > 0 &&
      spawnIndex.current >= allWords.length &&
      fallingWords.length === 0 &&
      !loading
    ) {
      setGameOver(true);
    }
  }, [fallingWords, allWords, loading]);

  const handleStartGame = () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    setTyped('');
    setLaserId(null);
    setFailedWords([]);
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

  if (gameOver) {
    return (
      <div className="galaxy-bg">
        <div className="game-container">
          <h1>Word Hero</h1>
          <ScoreSidebar score={score} />
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
          <button
            className="restart-btn"
            onClick={() => {
              setAllWords([]);
              setFailedWords([]);
              setGameOver(false);
              setScore(0);
              setTyped('');
              setLaserId(null);
              setFallingWords([]);
              spawnIndex.current = 0;
              setResultMsg('');
              setShowInputForm(true);
            }}
          >
            Volver al inicio
          </button>
          <button
            className="restart-btn"
            style={{ marginLeft: 16, background: 'linear-gradient(90deg, #ff00cc 0%, #00ffe7 100%)' }}
            onClick={() => {
              setGameOver(false);
              setScore(0);
              setTyped('');
              setLaserId(null);
              setFallingWords([]);
              setFailedWords([]);
              spawnIndex.current = 0;
              setResultMsg('');
              handleStartGame();
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="galaxy-bg">
        <div className="game-container">
          <h2>Cargando palabras...</h2>
        </div>
      </div>
    );
  }
  if (showInputForm) {
    return (
      <div className="galaxy-bg">
        <div className="game-container input-form-container">
          <WordInputForm
            inputEnglish={inputEnglish}
            setInputEnglish={setInputEnglish}
            inputSpanish={inputSpanish}
            setInputSpanish={setInputSpanish}
            handleStartGame={handleStartGame}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="vivid-bg">
      <ScoreSidebar score={score} />
      <main className="game-area-vivid">
        <div className="stars-animated-vivid"></div>
        {fallingWords.map(wordObj => (
          <WordComponent
            key={wordObj.key}
            word={wordObj}
            estado={wordObj.estado}
            onMiss={() => handleMiss(wordObj.id)}
            laser={false}
            fallDuration={FALL_DURATION}
            areaHeight={window.innerHeight - 220}
            vivid
            dataWordId={wordObj.id}
          />
        ))}
        <Cannon x={cannonX} />
        {showLaser && <Laser />}
        <div
          className="floating-typed-below-cannon-vivid"
          style={{
            left: `${cannonX}px`,
            bottom: '30px',
            transition: 'left 0.35s cubic-bezier(0.22,1,0.36,1)'
          }}
        >
          {typed}
        </div>
        {resultMsg && (
          <div className="result-msg-hud-vivid">
            {resultMsg}
          </div>
        )}
      </main>
      {/* Pantalla de Game Over */}
      {gameOver && (
        <div className="gameover-modal">
          <div className="gameover-card">
            <div className="gameover-title">¡Juego Terminado!</div>
            <div className="gameover-score">Puntaje: <b>{score}</b></div>
            <RewardSystem points={score} />
            {failedWords.length > 0 && (
              <div className="gameover-failed">
                <h4>Palabras fallidas:</h4>
                <ul>
                  {failedWords.map((w, idx) => (
                    <li key={w.id + '-' + idx}>
                      <b>{w.word}</b> &rarr; {w.translation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button className="gameover-btn" onClick={() => {
              setAllWords([]);
              setFailedWords([]);
              setGameOver(false);
              setScore(0);
              setTyped('');
              setLaserId(null);
              setFallingWords([]);
              spawnIndex.current = 0;
              setResultMsg('');
              setShowInputForm(true);
            }}>Volver al inicio</button>
            <button className="gameover-btn" style={{background: 'linear-gradient(90deg, #ff00cc 0%, #00ffe7 100%)'}}
              onClick={() => {
                setGameOver(false);
                setScore(0);
                setTyped('');
                setLaserId(null);
                setFallingWords([]);
                setFailedWords([]);
                spawnIndex.current = 0;
                setResultMsg('');
                handleStartGame();
              }}>Intentar de nuevo</button>
          </div>
        </div>
      )}
      {/* Pantalla de carga */}
      {loading && (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <div className="loading-text">Cargando palabras...</div>
        </div>
      )}
      {/* Formulario de entrada */}
      {showInputForm && (
        <div className="input-modal">
          <WordInputForm
            inputEnglish={inputEnglish}
            setInputEnglish={setInputEnglish}
            inputSpanish={inputSpanish}
            setInputSpanish={setInputSpanish}
            handleStartGame={handleStartGame}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default App;
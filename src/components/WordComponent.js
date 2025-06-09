import React, { useEffect, useRef, useState } from 'react';

const getHorizontalPosition = (id, totalWidth = window.innerWidth) => {
  const min = 120;
  const max = totalWidth - 320;
  const base = Math.floor(min + ((max - min) * (0.5 + 0.45 * Math.sin(id * 1.7))));
  return base + ((id % 3) * 40);
};

const WordComponent = ({ word, estado, onMiss, laser, fallDuration, areaHeight, vivid, dataWordId }) => {
  const wordRef = useRef(null);
  const [exploded, setExploded] = useState(false);
  const [left] = useState(getHorizontalPosition(word.id));
  const [hasFallen, setHasFallen] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    setExploded(false);
    setHasFallen(false);
    if (estado === 'falling' && wordRef.current) {
      wordRef.current.style.transition = 'none';
      wordRef.current.style.top = '0px';
      // Forzar reflow
      void wordRef.current.offsetWidth;
      setTimeout(() => {
        if (wordRef.current) {
          wordRef.current.style.transition = `top ${fallDuration}ms cubic-bezier(0.22,1,0.36,1)`;
          wordRef.current.style.top = `${(areaHeight || window.innerHeight - 220) - 120}px`;
          setHasFallen(true);
        }
      }, 10);
      const timeout = setTimeout(() => {
        setExploded(true);
        onMiss(word.id);
      }, fallDuration);
      return () => clearTimeout(timeout);
    }
  // Solo depende de la key (única por aparición)
  // eslint-disable-next-line
  }, [word.key]);

  useEffect(() => {
    if (laser && wordRef.current) {
      wordRef.current.style.background = '#ffd700';
      wordRef.current.style.color = '#b22222';
      wordRef.current.style.boxShadow = '0 0 32px #ffd700, 0 0 32px #ff4500';
      const timeout = setTimeout(() => {
        if (wordRef.current) {
          wordRef.current.style.background = '';
          wordRef.current.style.color = '';
          wordRef.current.style.boxShadow = '';
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [laser]);

  // Si no hay palabra, no renderizar nada
  if (!word || !word.word) return null;

  if (estado === 'exploded' || exploded) {
    return (
      <div
        className="explosion"
        style={{
          position: 'absolute',
          left: left,
          top: (areaHeight || window.innerHeight - 220) - 120,
          fontSize: '3.2rem',
          pointerEvents: 'none',
          userSelect: 'none',
          filter: 'drop-shadow(0 0 32px #ffd700)'
        }}
        data-word-id={dataWordId || word.id}
      >
        {'💥'}
      </div>
    );
  }

  return (
    <div
      ref={wordRef}
      className="word"
      style={{
        left: left,
        top: 0,
        zIndex: laser ? 10 : 1
      }}
      data-word-id={dataWordId || word.id}
    >
=======
const WordComponent = ({ word }) => {
  useEffect(() => {
    gsap.to(`#word-${word.word}`, {
      y: '100vh',
      duration: 5,
    });
  }, [word]);

  return (
    <div id={`word-${word.word}`} className="word">
>>>>>>> 64e57be270e5b9b3e7c7ebc8a832029b2547e758
      {word.word}
    </div>
  );
};

export default WordComponent;
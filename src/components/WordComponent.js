import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const WordComponent = ({ word }) => {
  useEffect(() => {
    gsap.to(`#word-${word.word}`, {
      y: '100vh',
      duration: 5,
    });
  }, [word]);

  return (
    <div id={`word-${word.word}`} className="word">
      {word.word}
    </div>
  );
};

export default WordComponent;

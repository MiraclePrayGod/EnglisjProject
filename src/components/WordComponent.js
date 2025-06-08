import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const WordComponent = ({ word, onTranslate }) => {
  useEffect(() => {
    gsap.to(`#word-${word}`, {
      y: '100vh',
      duration: 5,
      onComplete: () => onTranslate(word),
    });
  }, [word]);

  return (
    <div id={`word-${word}`} className="word">
      {word}
    </div>
  );
};

export default WordComponent;

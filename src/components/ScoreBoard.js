import React from 'react';

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <span>Puntuación: {score}</span>
    </div>
  );
};

export default ScoreBoard;

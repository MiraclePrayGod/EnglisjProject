<<<<<<< HEAD
// ScoreBoard.js
import React from 'react';
function ScoreBoard({ score }) {
  return <div>Puntaje: {score}</div>;
}
export default ScoreBoard;
=======
import React from 'react';

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <span>Puntuación: {score}</span>
    </div>
  );
};

export default ScoreBoard;
>>>>>>> 64e57be270e5b9b3e7c7ebc8a832029b2547e758

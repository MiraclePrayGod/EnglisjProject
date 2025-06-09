// RewardSystem.js
import React from 'react';

const RewardSystem = ({ points }) => {
  let message = '';

  if (points >= 10) {
    message = '¡Excelente!';
  } else if (points >= 5) {
    message = '¡Sigue así!';
  }

  return <div className="reward-system">{message}</div>;
};

export default RewardSystem;

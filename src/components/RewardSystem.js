import React from 'react';

const RewardSystem = ({ score }) => {
  let message = '';

  if (score >= 10) {
    message = '¡Excelente!';
  } else if (score >= 5) {
    message = '¡Sigue así!';
  }

  return <div className="reward-system">{message}</div>;
};

export default RewardSystem;

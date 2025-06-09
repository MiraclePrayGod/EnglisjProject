import React from 'react';
import '../App.css';

const ScoreSidebar = ({ score }) => (
  <div className="score-sidebar-vivid">
    <span className="score-label-vivid">SCORE</span>
    <span className="score-value-vivid">{score}</span>
  </div>
);

export default ScoreSidebar;

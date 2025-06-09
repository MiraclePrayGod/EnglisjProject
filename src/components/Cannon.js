import React from 'react';
import '../App.css';

const Cannon = ({ x }) => (
  <div
    className="cannon-vivid-solid cannon-vivid-always"
    style={{
      left: `${x}px`,
      bottom: 0,
      position: 'fixed',
      transform: 'translateX(-50%)',
      transition: 'left 0.35s cubic-bezier(0.22,1,0.36,1)',
      zIndex: 300
    }}
  >
    <div className="cannon-barrel-vivid-solid"></div>
    <div className="cannon-mouth-vivid"></div>
    <div className="cannon-base-vivid-solid"></div>
  </div>
);

export default Cannon;

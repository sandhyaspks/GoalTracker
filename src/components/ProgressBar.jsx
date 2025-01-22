import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{
          width: `${progress}%`,
          backgroundColor: progress === 100 ? 'green' : 'blue',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;

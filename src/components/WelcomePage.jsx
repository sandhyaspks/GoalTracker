import React from "react";

const WelcomePage = ({ onStartClick }) => {
  return (
    <div className="welcome-container">
      {/* Welcome text */}
      <h1>Welcome to GoalTracker!</h1>
      <p>Let's help you achieve your goals step by step.</p>

      {/* Start button */}
      <button className="start-button" onClick={onStartClick}>
        Start Tracking Your Goals
      </button>

      <div className="info-text">
        <p>
          New here? <a href="/about">Learn more</a>
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;

import React from 'react';

const Stats = ({ goals }) => {
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.progress === 100).length;

  return (
    <div className="stats">
      <h2>Stats</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Completed Goals: {completedGoals}</p>
    </div>
  );
};

export default Stats;

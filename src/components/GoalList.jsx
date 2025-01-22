import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const GoalList = ({ goals, updateProgress, selectGoal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [progressFilter, setProgressFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');

  const today = new Date().toISOString().split('T')[0];

  // Filter goals based on search and filters
  const filteredGoals = goals.filter((goal) => {
    // Search filter by title or category
    const matchesSearch =
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Progress filter
    const matchesProgress =
      progressFilter === '' || goal.progress === parseInt(progressFilter);

    // Due date filter
    const matchesDueDate =
      dueDateFilter === '' || goal.dueDate === dueDateFilter;

    return matchesSearch && matchesProgress && matchesDueDate;
  });

  // Clear all filters and search input
  const clearFilters = () => {
    setSearchQuery('');
    setProgressFilter('');
    setDueDateFilter('');
  };

  return (
    <div className="goal-list">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search goals by title or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <label>
          Progress:
          <select
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}
          >
            <option value="">All</option>
            {[...Array(101)].map((_, i) => (
              <option key={i} value={i}>
                {i}%
              </option>
            ))}
          </select>
        </label>

        <label>
          Due Date:
          <input
            type="date"
            value={dueDateFilter}
            onChange={(e) => setDueDateFilter(e.target.value)}
          />
        </label>

        <button className="clear-filters" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Displaying filtered goals */}
      {filteredGoals.length === 0 ? (
        <p>No goals match your search or filters.</p>
      ) : (
        filteredGoals.map((goal) => {
          const isOverdue = goal.dueDate < today;
          const isDueToday = goal.dueDate === today;
          const isUpcoming = goal.dueDate > today;

          return (
            <div
              className={`goal-item ${isOverdue ? 'overdue' : isDueToday ? 'due-today' : 'upcoming'}`}
              key={goal.id}
            >
              <h2 onClick={() => selectGoal(goal.id)} style={{ cursor: 'pointer' }}>
                {goal.title}
              </h2>
              <p>
                <strong>Category:</strong> {goal.category}
              </p>
              <p>
                <strong>Progress:</strong> {goal.progress}% of {goal.milestones} Milestones
              </p>
              <p>
                <strong>Due Date:</strong> {goal.dueDate}{' '}
                {isOverdue ? (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Overdue!</span>
                ) : isDueToday ? (
                  <span style={{ color: 'orange', fontWeight: 'bold' }}>Due Today!</span>
                ) : isUpcoming ? (
                  <span style={{ color: 'green', fontWeight: 'bold' }}>Upcoming</span>
                ) : null}
              </p>
              <ProgressBar progress={goal.progress} />
              <label htmlFor={`progress-${goal.id}`}>Update Progress:</label>
              <input
                id={`progress-${goal.id}`}
                type="number"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= 0 && value <= 100) {
                    updateProgress(goal.id, value);
                  }
                }}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default GoalList;

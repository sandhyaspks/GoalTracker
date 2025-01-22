import React, { useState } from 'react';

const GoalDetails = ({ goal, onClose, onDelete, onEdit }) => {
  const [updatedTitle, setUpdatedTitle] = useState(goal.title);
  const [updatedMilestones, setUpdatedMilestones] = useState(goal.milestones);
  const [updatedDueDate, setUpdatedDueDate] = useState(goal.dueDate || '');

  const handleEdit = () => {
    onEdit(goal.id, updatedTitle, updatedMilestones, updatedDueDate);
  };

  const handleDelete = () => {
    onDelete(goal.id);
  };

  return (
    <div className="modal-overlay">
      <div className="goal-details-modal">
        <h2>{goal.title}</h2>
        <p>Milestones: {goal.milestones}</p>
        <p>Progress: {goal.progress}%</p>
        <p>Due Date: {goal.dueDate || 'No due date set'}</p>

        <div className="actions">
          <input
            type="text"
            placeholder="Update Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Update Milestones"
            value={updatedMilestones}
            onChange={(e) => setUpdatedMilestones(e.target.value)}
          />
          <input
            type="date"
            value={updatedDueDate}
            onChange={(e) => setUpdatedDueDate(e.target.value)}
          />
          <button onClick={handleEdit}>Save Changes</button>
          <button onClick={handleDelete}>Delete Goal</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;

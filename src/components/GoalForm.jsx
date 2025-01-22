import React, { useState } from 'react';

const GoalForm = ({ addGoal }) => {
  const [title, setTitle] = useState('');
  const [milestones, setMilestones] = useState('');
  const [progress, setProgress] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Work'); // Default category
  const [customCategory, setCustomCategory] = useState(''); // For dynamic input
  const [categories, setCategories] = useState([
    'Work',
    'Personal',
    'Fitness',
    'Education',
    'Other',
  ]); // Initial category options

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && milestones && dueDate && category) {
      const finalCategory = category === 'Other' && customCategory ? customCategory : category;

      addGoal({
        id: Math.random(),
        title,
        milestones,
        progress,
        dueDate,
        category: finalCategory, // Use custom or selected category
      });

      setTitle('');
      setMilestones('');
      setProgress(0);
      setDueDate('');
      setCategory('Work'); // Reset to default
      setCustomCategory(''); // Reset custom category
    } else {
      alert('Please fill all fields before submitting!');
    }
  };

  const handleCustomCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCategory(customCategory);
    }
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Goal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Milestones"
        value={milestones}
        onChange={(e) => setMilestones(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Due Date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {category === 'Other' && (
        <div>
          <input
            type="text"
            placeholder="Custom Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
          <button
            type="button"
            onClick={handleCustomCategory}
            disabled={!customCategory}
          >
            Add Custom Category
          </button>
        </div>
      )}
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default GoalForm;

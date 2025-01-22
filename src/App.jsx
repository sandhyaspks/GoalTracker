import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaPlus, FaChartPie, FaListAlt } from "react-icons/fa"; // Importing React Icons
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import GoalDetails from "./components/GoalDetails";
import Stats from "./components/Stats";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WelcomePage from "./components/WelcomePage"; // Importing the new WelcomePage
import "./App.css";

const App = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isStarted, setIsStarted] = useState(false); // State to track whether the user has started the app

  // Function to add a new goal
  const addGoal = (goal) => {
    setGoals((prevGoals) => [...prevGoals, goal]);
  };

  // Function to update the progress of a goal
  const updateProgress = (id, progress) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id
          ? { ...goal, progress: Math.min(Math.max(progress, 0), 100) }
          : goal
      )
    );
  };

  // Function to select a goal (for viewing details)
  const selectGoal = (id) => {
    setSelectedGoal(goals.find((goal) => goal.id === id));
  };

  // Close the goal details view
  const closeDetails = () => {
    setSelectedGoal(null);
  };

  // Function to delete a goal
  const deleteGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    closeDetails(); // Close popup after deletion
  };

  // Function to edit an existing goal
  const editGoal = (id, updatedTitle, updatedMilestones, updatedDueDate) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id
          ? { ...goal, title: updatedTitle, milestones: updatedMilestones, dueDate: updatedDueDate }
          : goal
      )
    );
    closeDetails(); // Close popup after editing
  };

  // Function to handle when the start button is clicked
  const handleStart = () => {
    setIsStarted(true); // Set state to true when the start button is clicked
  };

  return (
    <Router>
      <div className="App">
        {isStarted ? ( // Show the welcome page only if the user has not started the app
          <>
            <Header />
            <nav className="navbar">
              <ul>
                <li>
                  <Link to="/">
                    <FaPlus /> Add New Goal
                  </Link>
                </li>
                <li>
                  <Link to="/stats">
                    <FaChartPie /> Stats
                  </Link>
                </li>
                <li>
                  <Link to="/goals">
                    <FaListAlt /> List of Goals
                  </Link>
                </li>
              </ul>
            </nav>
            <main>
              <Routes>
                <Route path="/" element={<GoalForm addGoal={addGoal} />} />
                <Route path="/stats" element={<Stats goals={goals} />} />
                <Route
                  path="/goals"
                  element={
                    <>
                      <GoalList
                        goals={goals}
                        updateProgress={updateProgress}
                        selectGoal={selectGoal}
                      />
                      {selectedGoal && (
                        <GoalDetails
                          goal={selectedGoal}
                          onClose={closeDetails}
                          onDelete={deleteGoal}
                          onEdit={editGoal}
                        />
                      )}
                    </>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </>
        ) : (
          <WelcomePage onStartClick={handleStart} /> // Show WelcomePage before the main content
        )}
      </div>
    </Router>
  );
};

export default App;

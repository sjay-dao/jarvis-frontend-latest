import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import axios from "axios";
import AIComponent from './components/AIComponent'; // Import the AI component

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/all`);
    setTasks(res.data);
  };

  const addTask = async (input) => {
    await axios.post(`${API_URL}/add`, { input });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧠 Jarvis Task Manager</h1>
      <TaskInput onSubmit={addTask} />
      <TaskList tasks={tasks} onUpdate={fetchTasks} />
      <AIComponent />
    </div>
  );
}

export default App;

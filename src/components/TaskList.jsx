import React from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

function TaskList({ tasks, onUpdate }) {
  const toggleDone = async (task) => {
    await axios.patch(`${API_URL}/done/${task.id}`, {
      isDone: !task.isDone,
    });
    onUpdate();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    onUpdate();
  };

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`border p-3 rounded-lg shadow-sm flex justify-between items-center ${
            task.isDone ? "bg-green-100" : ""
          }`}
        >
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => toggleDone(task)}
              />
              <span className={`${task.isDone ? "line-through text-gray-500" : ""}`}>
                {task.description}
              </span>
            </label>
            {task.dueDate && (
              <div className="text-sm text-gray-600 ml-6">
                Due: {new Date(task.dueDate._seconds * 1000).toLocaleString()}
              </div>
            )}
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

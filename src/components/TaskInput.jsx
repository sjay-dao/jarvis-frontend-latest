import React, { useState } from "react";

function TaskInput({ onSubmit }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput("");
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "Generate a task idea for my to-do list" }),
      });

      const data = await res.json();
      setInput(data.output || ""); // Auto-fill the input field
    } catch (err) {
      console.error("Gemini API error:", err);
      alert("Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. Remind me to call John on Friday"
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
        <button
          type="button"
          onClick={handleGenerate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>
      </div>
    </form>
  );
}

export default TaskInput;

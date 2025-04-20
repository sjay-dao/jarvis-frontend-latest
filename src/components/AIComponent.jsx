import React, { useState } from 'react';

const AIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateWithGemini = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter a prompt for Gemini"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateWithGemini} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Content'}
      </button>

      <div>
        {output && <p>Gemini Response: {output}</p>}
      </div>
    </div>
  );
};

export default AIComponent;

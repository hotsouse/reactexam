import React, { useState } from "react";

export default function ExamMode() {
  const [mode, setMode] = useState(false);

  return (
    <div className="card">
      <h2>🧪 Exam Mode</h2>

      <button 
        onClick={() => setMode(true)} 
        className={mode ? "activeBtn" : ""}
      >Enable</button>

      <button onClick={() => setMode(false)}>Disable</button>

      <p>{mode ? "Exam Mode ON — скрыты отвлекающие элементы" : "Exam Mode OFF"}</p>
    </div>
  );
}

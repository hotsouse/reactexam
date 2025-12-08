import React, { useState } from "react";

export default function Breathing() {
  const [active, setActive] = useState(false);
  const [text, setText] = useState("");

  const start = () => {
    setActive(true);
    setText("Вдох...");

    setTimeout(() => setText("Задержи дыхание..."), 4000);
    setTimeout(() => setText("Выдох..."), 7000);
    setTimeout(() => setActive(false), 11000);
  };

  return (
    <div className="card">
      <h2>🌬️ Breathing Exercise</h2>

      <button onClick={start} disabled={active}>
        {active ? "В процессе..." : "Начать"}
      </button>

      <p>{text}</p>

      {active && <div className="breathing-circle"></div>}
    </div>
  );
}

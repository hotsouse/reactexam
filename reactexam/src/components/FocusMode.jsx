import React, { useState } from "react";

export default function FocusMode() {
  const [focus, setFocus] = useState(
    () => JSON.parse(localStorage.getItem("focus_mode")) || false
  );

  const toggle = (value) => {
    setFocus(value);
    localStorage.setItem("focus_mode", JSON.stringify(value));
  };

  return (
    <div className="card">
      <h2>🎧 Focus Mode</h2>

      <button 
        onClick={() => toggle(true)} 
        className={focus ? "activeBtn" : ""}
      >On</button>

      <button 
        onClick={() => toggle(false)}
      >Off</button>

      <p>
        {focus
          ? "Focus Mode ON — отключены уведомления внутри приложения"
          : "Focus Mode OFF"}
      </p>
    </div>
  );
}

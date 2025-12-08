import React, { useState, useEffect } from "react";

export default function StressMeter({ onHighStress }) {
  const [stress, setStress] = useState(
    () => Number(localStorage.getItem("stress-level")) || 1
  );

  const recommendations = {
    1: "Ты в порядке 👍",
    2: "Отдохни и помедитируй",
    3: "Сделай перерыв и выпей воды",
    4: "Опасно: снизь нагрузку!",
    5: "СРОЧНО: сделай дыхательную практику!"
  };

  useEffect(() => {
    localStorage.setItem("stress-level", stress);

    // ♻️ ← ИСПРАВЛЕНИЕ: безопасный вызов
    if (stress >= 4 && typeof onHighStress === "function") {
      onHighStress(stress);
    }

  }, [stress]);

  return (
    <div className="card">
      <h3>💗 Стресс-метр</h3>
      <div className="numbers">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={stress === n ? "active" : ""}
            onClick={() => setStress(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <p>Рекомендация: {recommendations[stress]}</p>
    </div>
  );
}

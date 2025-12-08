import React, { useState, useRef } from "react";

export default function WhiteNoise() {
  const [currentSound, setCurrentSound] = useState("");
  const audioRef = useRef(null);

  const sounds = {
    rain: "/sounds/rain.mp3",
    forest: "/sounds/forest.mp3",
    cafe: "/sounds/cafe.mp3",
  };

  const play = (type) => {
    // останавливаем предыдущий звук
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // создаём новый объект Audio
    audioRef.current = new Audio(sounds[type]);
    audioRef.current.loop = true;

    audioRef.current.play().catch((err) => {
      console.log("Ошибка воспроизведения:", err);
    });

    setCurrentSound(type);

    // авто-стоп через 20 минут
    setTimeout(() => stop(), 20 * 60 * 1000);
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentSound("");
  };

  return (
    <div className="card">
      <h3>😴 White Noise</h3>
      <button onClick={() => play("rain")}>Rain</button>
      <button onClick={() => play("forest")}>Forest</button>
      <button onClick={() => play("cafe")}>Cafe</button>
      <button onClick={stop}>Stop</button>
      {currentSound && <p>Playing: {currentSound}</p>}
    </div>
  );
}

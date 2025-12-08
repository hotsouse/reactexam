import React, { useState, useEffect } from "react";
import Controls from "./Controls";
import "./Pomodoro.css";


export default function Pomodoro() {
const [seconds, setSeconds] = useState(1500);
const [running, setRunning] = useState(false);


useEffect(() => {
if (!running) return;
const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
return () => clearInterval(timer);
}, [running]);


return (
<div className="pomodoro">
<h2>Pomodoro</h2>
<div className="timer">{Math.floor(seconds / 60)}:{seconds % 60}</div>
<Controls setRunning={setRunning} />
</div>
);
}
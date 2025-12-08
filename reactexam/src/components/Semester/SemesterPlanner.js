import React, { useState } from "react";
import "./Semester.css";


export default function SemesterPlanner() {
const [weeks, setWeeks] = useState([]);
const [weekName, setWeekName] = useState("");


const addWeek = () => {
if (!weekName.trim()) return;
setWeeks([...weeks, weekName]);
setWeekName("");
};


return (
<div className="semester">
<h2>Semester Planner</h2>
<input value={weekName} onChange={(e) => setWeekName(e.target.value)} />
<button onClick={addWeek}>Add Week</button>


<ul>
{weeks.map((w, i) => <li key={i}>{w}</li>)}
</ul>
</div>
);
}
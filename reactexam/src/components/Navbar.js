import React from "react";
import "./Navbar.css";


export default function Navbar({ setPage }) {
return (
<nav className="navbar">
<button onClick={() => setPage("todo")}>To‑do</button>
<button onClick={() => setPage("pomodoro")}>Pomodoro</button>
<button onClick={() => setPage("productivity")}>Productivity</button>
<button onClick={() => setPage("semester")}>Semester</button>
<button onClick={() => setPage("notifications")}>Notify</button>
</nav>
);
}
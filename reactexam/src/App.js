import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo/Todo";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import Productivity from "./components/Productivity/Productivity";
import SemesterPlanner from "./components/Semester/SemesterPlanner";
import Notifications from "./components/Notifications/Notifications";


export default function App() {
const [page, setPage] = useState("todo");


const renderPage = () => {
switch (page) {
case "todo": return <Todo />;
case "pomodoro": return <Pomodoro />;
case "productivity": return <Productivity />;
case "semester": return <SemesterPlanner />;
case "notifications": return <Notifications />;
default: return <Todo />;
}
};


return (
<div className="app">
<Navbar setPage={setPage} />
<div className="content">{renderPage()}</div>
</div>
);
}
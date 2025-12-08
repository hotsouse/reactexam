import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./Todo.css";


export default function Todo() {
const [tasks, setTasks] = useState([
{ id: "1", text: "Learn React" },
{ id: "2", text: "Finish homework" },
]);
const [input, setInput] = useState("");


const addTask = () => {
if (!input.trim()) return;
setTasks([...tasks, { id: Date.now().toString(), text: input }]);
setInput("");
};


const onDragEnd = (result) => {
if (!result.destination) return;


const newList = [...tasks];
const [removed] = newList.splice(result.source.index, 1);
newList.splice(result.destination.index, 0, removed);
setTasks(newList);
};


return (
<div className="todo">
<h2>Tasks</h2>


<div className="todo-input">
<input value={input} onChange={(e) => setInput(e.target.value)} />
<button onClick={addTask}>Add</button>
</div>


<DragDropContext onDragEnd={onDragEnd}>
<Droppable droppableId="tasks">
{(provided) => (
<div {...provided.droppableProps} ref={provided.innerRef}>
{tasks.map((task, index) => (
<TaskItem key={task.id} task={task} index={index} />
))}
{provided.placeholder}
</div>
)}
</Droppable>
</DragDropContext>
</div>
);
}
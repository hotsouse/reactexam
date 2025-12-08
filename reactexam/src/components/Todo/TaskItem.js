import React from "react";
import { Draggable } from "react-beautiful-dnd";


export default function TaskItem({ task, index }) {
return (
<Draggable draggableId={task.id} index={index}>
{(provided) => (
<div
className="task-item"
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
>
{task.text}
</div>
)}
</Draggable>
);
}
import React from "react";
import ProductivityChart from "./ProductivityChart";
import "./Productivity.css";


export default function Productivity() {
const data = [
{ day: "Mon", focus: 3 },
{ day: "Tue", focus: 2 },
{ day: "Wed", focus: 5 },
{ day: "Thu", focus: 4 },
{ day: "Fri", focus: 6 },
];


return (
<div className="productivity">
<h2>Productivity Chart</h2>
<ProductivityChart data={data} />
</div>
);
}
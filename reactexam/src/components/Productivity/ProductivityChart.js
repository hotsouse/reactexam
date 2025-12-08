import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


export default function ProductivityChart({ data }) {
return (
<LineChart width={600} height={300} data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="day" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="focus" stroke="blue" strokeWidth={2} />
</LineChart>
);
}
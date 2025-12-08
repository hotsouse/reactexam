import React from "react";


export default function Controls({ setRunning }) {
return (
<div>
<button onClick={() => setRunning(true)}>Start</button>
<button onClick={() => setRunning(false)}>Stop</button>
</div>
);
}
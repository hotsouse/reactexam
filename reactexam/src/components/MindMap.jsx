// MindMap.jsx
import React, { useState } from "react";

export default function MindMap() {
  const [nodes, setNodes] = useState([]);

  function addNode() {
    setNodes([...nodes, { id: Date.now(), x: 100, y: 100, text: "Новая идея" }]);
  }

  return (
    <div className="mindmap-area">
      <button onClick={addNode}>+ Add Node</button>

      {nodes.map((node) => (
        <div
          key={node.id}
          className="mind-node"
          style={{ left: node.x, top: node.y }}
        >
          <input
            value={node.text}
            onChange={(e) =>
              setNodes(
                nodes.map((n) =>
                  n.id === node.id ? { ...n, text: e.target.value } : n
                )
              )
            }
          />
        </div>
      ))}
    </div>
  );
}

import React from "react";

function Column({ title, tasks }) {
  return (
    <div style={{ width: "30%", background: "#f1f1f1", padding: "1rem", borderRadius: "8px" }}>
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <div key={index} style={{ padding: "0.5rem", background: "white", marginBottom: "0.5rem", borderRadius: "4px" }}>
          {task}
        </div>
      ))}
    </div>
  );
}

export default Column;

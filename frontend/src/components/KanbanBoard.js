import React, { useState } from 'react';
import './KanbanBoard.css';

const initialTasks = {
  todo: [],
  inProgress: [],
  done: []
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks({ ...tasks, todo: [...tasks.todo, newTask] });
    setNewTask('');
  };

  const moveTask = (task, from, to) => {
    setTasks(prev => ({
      ...prev,
      [from]: prev[from].filter(t => t !== task),
      [to]: [...prev[to], task]
    }));
  };

  const handleRemoveTask = (task, column) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t !== task)
    }));
  };
  

  return (
    <div className="kanban-container">
      <h2>Kanban Board</h2>
      <div className="add-task">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="columns">
        {['todo', 'inProgress', 'done'].map(column => (
          <div key={column} className="column">
            <h3>{column.toUpperCase()}</h3>
            {tasks[column].map(task => (
              <div key={task} className="task">
                {task}
                <div className="actions">
                  {column !== 'todo' && (
                    <button onClick={() => moveTask(task, column, 'todo')}>←</button>
                  )}
                  {column !== 'inProgress' && (
                    <button onClick={() => moveTask(task, column, 'inProgress')}>→</button>
                  )}
                  {column !== 'done' && (
                    <button onClick={() => moveTask(task, column, 'done')}>→</button>
                  )}
                   <button onClick={() => handleRemoveTask(task, column)}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

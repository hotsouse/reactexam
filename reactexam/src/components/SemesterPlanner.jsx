import React, { useState, useEffect } from 'react';
import './SemesterPlanner.css';

function SemesterPlanner() {
  const [weeks, setWeeks] = useState([]);
  const [newTask, setNewTask] = useState({ weekId: 1, text: '' });

  // Загружаем задачи из localStorage при монтировании
  useEffect(() => {
    const savedWeeks = JSON.parse(localStorage.getItem('semester:tasks')) || [
      { id: 1, title: "Неделя 1", tasks: [], expanded: true },
      { id: 2, title: "Неделя 2", tasks: [], expanded: false },
      { id: 3, title: "Неделя 3", tasks: [], expanded: false },
      { id: 4, title: "Неделя 4", tasks: [], expanded: false },
      { id: 5, title: "Неделя 5", tasks: [], expanded: false },
      { id: 6, title: "Неделя 6", tasks: [], expanded: false },
    ];
    setWeeks(savedWeeks);
  }, []);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    if (weeks.length > 0) {
      localStorage.setItem('semester:tasks', JSON.stringify(weeks));
    }
  }, [weeks]);

  const addTask = () => {
    if (!newTask.text.trim()) return;
    
    setWeeks(weeks.map(week => 
      week.id === newTask.weekId 
        ? { 
            ...week, 
            tasks: [...week.tasks, {
              id: Date.now(),
              text: newTask.text,
              done: false,
              createdAt: new Date().toISOString()
            }]
          }
        : week
    ));
    
    setNewTask({ weekId: newTask.weekId, text: '' });
  };

  const toggleWeek = (weekId) => {
    setWeeks(weeks.map(week => 
      week.id === weekId 
        ? { ...week, expanded: !week.expanded }
        : week
    ));
  };

  const deleteTask = (weekId, taskId) => {
    setWeeks(weeks.map(week => 
      week.id === weekId 
        ? { ...week, tasks: week.tasks.filter(t => t.id !== taskId) }
        : week
    ));
  };

  const toggleTask = (weekId, taskId) => {
    setWeeks(weeks.map(week => 
      week.id === weekId 
        ? { 
            ...week, 
            tasks: week.tasks.map(t => 
              t.id === taskId ? { ...t, done: !t.done } : t
            )
          }
        : week
    ));
  };

  return (
    <div className="semester-planner">
      <div className="planner-header">
        <h3>📚 Планировщик семестра</h3>
        <div className="controls">
          <select 
            value={newTask.weekId} 
            onChange={(e) => setNewTask({...newTask, weekId: parseInt(e.target.value)})}
            className="week-select"
          >
            {weeks.map(week => (
              <option key={week.id} value={week.id}>{week.title}</option>
            ))}
          </select>
          <input
            type="text"
            value={newTask.text}
            onChange={(e) => setNewTask({...newTask, text: e.target.value})}
            placeholder="Введите задачу для недели..."
            className="task-input"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} className="add-btn">+</button>
        </div>
      </div>

      <div className="weeks-container">
        {weeks.map(week => (
          <div key={week.id} className={`week-card ${week.expanded ? 'expanded' : ''}`}>
            <div className="week-header" onClick={() => toggleWeek(week.id)}>
              <h4>
                {week.title}
                <span className="task-count">({week.tasks.length})</span>
              </h4>
              <span className="toggle-icon">
                {week.expanded ? '▼' : '▶'}
              </span>
            </div>
            
            {week.expanded && (
              <div className="week-content">
                {week.tasks.length === 0 ? (
                  <p className="empty-state">Нет задач. Добавьте первую задачу!</p>
                ) : (
                  <div className="tasks-list">
                    {week.tasks.map(task => (
                      <div key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleTask(week.id, task.id)}
                          className="task-checkbox"
                        />
                        <span className="task-text">{task.text}</span>
                        <button 
                          onClick={() => deleteTask(week.id, task.id)}
                          className="delete-btn"
                          title="Удалить задачу"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="week-stats">
                  <span>
                    ✅ Выполнено: {week.tasks.filter(t => t.done).length} из {week.tasks.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SemesterPlanner;
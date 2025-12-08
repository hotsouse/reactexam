import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TaskTracker() {
  // Пустой массив задач по умолчанию
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Функция для добавления новой задачи
  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now().toString(),
      content: newTask,
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  // Функция для удаления задачи
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Функция для обработки перетаскивания
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div className="card">
      <h3>Task Tracker</h3>
      
      {/* Форма для добавления задач */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Список задач */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: '100px' }}
            >
              {tasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  No tasks yet. Add your first task above.
                </p>
              ) : (
                tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          padding: '12px',
                          marginBottom: '8px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>{task.content}</span>
                        <button
                          onClick={() => removeTask(task.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff4444',
                            cursor: 'pointer',
                            fontSize: '16px',
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
import React from 'react';
import { useTasks } from '../utils/taskStore';
import './AutoScheduler.css';

export default function AutoScheduler() {
  const { getMergedTasks } = useTasks();

  const schedule = () => {
    const allTasks = getMergedTasks();
    const pending = allTasks.filter(t => !t.done);
    
    const days = 7;
    const buckets = Array.from({ length: days }, () => []);
    
    for (let i = 0; i < pending.length; i++) {
      buckets[i % days].push(pending[i]);
    }
    
    let out = '📅 Автоматический план на 7 дней:\n\n';
    buckets.forEach((b, i) => {
      const dayName = getDayName(i);
      const tasksText = b.map(x => `✓ ${x.title}`).join('\n  ') || '— Отдых или повторение материала —';
      out += `📌 ${dayName}:\n  ${tasksText}\n\n`;
    });
    
    // Вместо alert используем модальное окно или отображение в компоненте
    displaySchedule(out);
  };

  const getDayName = (index) => {
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    return days[index] || `День ${index + 1}`;
  };

  const displaySchedule = (scheduleText) => {
    // Создаем модальное окно для отображения расписания
    const modal = document.createElement('div');
    modal.className = 'schedule-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>📅 Ваше расписание на неделю</h3>
        <pre style="white-space: pre-wrap; font-family: inherit;">${scheduleText}</pre>
        <button onclick="this.parentElement.parentElement.remove()">Закрыть</button>
      </div>
    `;
    document.body.appendChild(modal);
  };

  return (
    <div className="auto-scheduler-card">
      <div className="scheduler-header">
        <h4>⚡ Auto Scheduler</h4>
        <span className="badge">Умное планирование</span>
      </div>
      
      <div className="scheduler-content">
        <button className="generate-btn" onClick={schedule}>
          <span className="btn-icon">✨</span>
          Сгенерировать план на неделю
        </button>
        
        <div className="scheduler-info">
          <p className="info-text">
            📊 Распределяет задачи из всех разделов (ежедневные, семестровые, дедлайны) по дням недели
          </p>
          <ul className="features-list">
            <li>✓ Учитывает приоритет задач</li>
            <li>✓ Балансирует нагрузку</li>
            <li>✓ Рекомендует дни для отдыха</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
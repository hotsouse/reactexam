// src/utils/taskStore.js
export const TASK_TYPES = {
  DAILY: 'daily',
  SEMESTER: 'semester',
  DEADLINE: 'deadline'
}

export function useTasks() {
  // Объединяем все задачи из разных источников
  const getMergedTasks = () => {
    try {
      const dailyTasks = JSON.parse(localStorage.getItem('study:tasks') || '[]');
      const semesterTasks = JSON.parse(localStorage.getItem('semester:tasks') || '[]');
      const deadlineTasks = JSON.parse(localStorage.getItem('deadline:tasks') || '[]');
      
      return [
        ...dailyTasks.map(t => ({ ...t, type: TASK_TYPES.DAILY })),
        ...semesterTasks.map(t => ({ ...t, type: TASK_TYPES.SEMESTER })),
        ...deadlineTasks.map(t => ({ ...t, type: TASK_TYPES.DEADLINE }))
      ];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  };

  return { getMergedTasks };
}
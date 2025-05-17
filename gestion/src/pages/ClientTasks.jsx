// src/pages/ClientTasks.jsx
import React, { useState, useEffect } from 'react';
import './ClientTasks.css'; // رابط CSS ديالك

export default function ClientTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // مؤقتاً، داتا وهمية
    const fakeTasks = [
      { id: 1, title: 'Tâche 1', status: 'to do' },
      { id: 2, title: 'Tâche 2', status: 'in progress' },
      { id: 3, title: 'Tâche 3', status: 'done' }
    ];

    setTasks(fakeTasks); // نعمر الستيت
  }, []);

  // دالة تعطي لون حسب الستاتوس
  const getStatusColor = (status) => {
    switch (status) {
      case 'to do':
        return 'status-todo';
      case 'in progress':
        return 'status-inprogress';
      case 'done':
        return 'status-done';
      default:
        return '';
    }
  };

  return (
    <div className="client-tasks-container">
      <h1 className="client-tasks-title">Mes Tâches</h1>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>Aucune tâche trouvée.</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <span className={`task-status ${getStatusColor(task.status)}`}>
              {task.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
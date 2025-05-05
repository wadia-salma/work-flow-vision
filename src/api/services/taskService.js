
// Mock task service
const taskService = {
  getAllTasks: async () => {
    console.log("Mock getAllTasks called");
    return [
      {
        id: "t1",
        title: "Design Homepage",
        description: "Create new homepage mockups",
        status: "done",
        projectId: "p1",
        assignedEmployees: ["e1"],
        createdAt: "2023-01-20",
        daysSpent: 5
      },
      {
        id: "t2",
        title: "Develop Frontend Components",
        description: "Implement React components based on designs",
        status: "in-progress",
        projectId: "p1",
        assignedEmployees: ["e2"],
        createdAt: "2023-01-25",
        daysSpent: 8
      },
      {
        id: "t3",
        title: "Setup Project Structure",
        description: "Initialize app structure and dependencies",
        status: "done",
        projectId: "p2",
        assignedEmployees: ["e3"],
        createdAt: "2023-02-15",
        daysSpent: 2
      },
      {
        id: "t4",
        title: "Implement API Integration",
        description: "Connect app to backend services",
        status: "todo",
        projectId: "p2",
        assignedEmployees: ["e4"],
        createdAt: "2023-02-20"
      }
    ];
  },
  
  createTask: async (task) => {
    console.log("Mock createTask called with:", task);
    return {
      ...task,
      id: `t${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
  },
  
  updateTask: async (taskId, updates) => {
    console.log(`Mock updateTask called for ID: ${taskId}`, updates);
    return { id: taskId, ...updates };
  },
  
  updateTaskStatus: async (taskId, newStatus) => {
    console.log(`Mock updateTaskStatus called for ID: ${taskId}`, newStatus);
    return { id: taskId, status: newStatus };
  },
  
  deleteTask: async (taskId) => {
    console.log(`Mock deleteTask called for ID: ${taskId}`);
    return true;
  }
};

export { taskService };

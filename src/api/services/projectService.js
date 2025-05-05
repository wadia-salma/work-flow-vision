
// Mock project service
const projectService = {
  getAllProjects: async () => {
    console.log("Mock getAllProjects called");
    return [
      {
        id: "p1",
        name: "Website Redesign",
        description: "Redesigning the company website with modern UI/UX",
        teamId: "t1",
        tasks: ["t1", "t2"],
        createdAt: "2023-01-15"
      },
      {
        id: "p2",
        name: "Mobile App Development",
        description: "Building a new mobile app for customers",
        teamId: "t2",
        tasks: ["t3", "t4"],
        createdAt: "2023-02-10"
      }
    ];
  },
  
  createProject: async (project) => {
    console.log("Mock createProject called with:", project);
    return {
      ...project,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
  },
  
  updateProject: async (projectId, updates) => {
    console.log(`Mock updateProject called for ID: ${projectId}`, updates);
    return { id: projectId, ...updates };
  },
  
  deleteProject: async (projectId) => {
    console.log(`Mock deleteProject called for ID: ${projectId}`);
    return true;
  }
};

export { projectService };

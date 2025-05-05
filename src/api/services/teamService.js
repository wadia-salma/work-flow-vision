
// Mock team service
const teamService = {
  getAllTeams: async () => {
    console.log("Mock getAllTeams called");
    return [
      {
        id: "t1",
        name: "Design Team",
        employeeIds: ["e1", "e2"]
      },
      {
        id: "t2",
        name: "Development Team",
        employeeIds: ["e3", "e4"]
      },
      {
        id: "t3",
        name: "Marketing Team",
        employeeIds: ["e5", "e6"]
      }
    ];
  },
  
  createTeam: async (team) => {
    console.log("Mock createTeam called with:", team);
    return {
      ...team,
      id: `t${Date.now()}`
    };
  },
  
  updateTeam: async (teamId, updates) => {
    console.log(`Mock updateTeam called for ID: ${teamId}`, updates);
    return { id: teamId, ...updates };
  },
  
  deleteTeam: async (teamId) => {
    console.log(`Mock deleteTeam called for ID: ${teamId}`);
    return true;
  }
};

export { teamService };

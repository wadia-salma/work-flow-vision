
// Mock employee service
const employeeService = {
  getAllEmployees: async () => {
    console.log("Mock getAllEmployees called");
    return [
      {
        id: "e1",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "UI Designer",
        teamId: "t1",
        avatar: null
      },
      {
        id: "e2",
        name: "Bob Smith",
        email: "bob@example.com",
        role: "UX Designer",
        teamId: "t1",
        avatar: null
      },
      {
        id: "e3",
        name: "Charlie Davis",
        email: "charlie@example.com",
        role: "Frontend Developer",
        teamId: "t2",
        avatar: null
      },
      {
        id: "e4",
        name: "Diana Miller",
        email: "diana@example.com",
        role: "Backend Developer",
        teamId: "t2",
        avatar: null
      },
      {
        id: "e5",
        name: "Ethan Wilson",
        email: "ethan@example.com",
        role: "Content Writer",
        teamId: "t3",
        avatar: null
      },
      {
        id: "e6",
        name: "Fiona Garcia",
        email: "fiona@example.com",
        role: "Social Media Manager",
        teamId: "t3",
        avatar: null
      }
    ];
  },
  
  createEmployee: async (employee) => {
    console.log("Mock createEmployee called with:", employee);
    return {
      ...employee,
      id: `e${Date.now()}`
    };
  },
  
  updateEmployee: async (employeeId, updates) => {
    console.log(`Mock updateEmployee called for ID: ${employeeId}`, updates);
    return { id: employeeId, ...updates };
  },
  
  deleteEmployee: async (employeeId) => {
    console.log(`Mock deleteEmployee called for ID: ${employeeId}`);
    return true;
  }
};

export { employeeService };

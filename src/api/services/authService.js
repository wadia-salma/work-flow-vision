
// Mock authentication service
const authService = {
  // Mock login function that returns a promise
  login: async (email, password) => {
    console.log("Mock login called with:", email, password);
    // Just return a fixed response for demo
    return {
      user: {
        id: 1,
        name: "Demo User",
        email: "demo@example.com",
        role: "admin",
        avatar: null
      }
    };
  },

  // Mock logout function
  logout: async () => {
    console.log("Mock logout called");
    return true;
  },

  // Mock getCurrentUser function
  getCurrentUser: async () => {
    console.log("Mock getCurrentUser called");
    // Return null to simulate no active user session
    return null;
  }
};

export { authService };

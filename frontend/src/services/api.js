const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const taskService = {
  getAllTasks: async () => {
    const response = await fetch(`${API_URL}/tasks/`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

updateTask: async (taskId, isCompleted) => {
    const response = await fetch(
        `${API_URL}/tasks/${taskId}?is_completed=${isCompleted}`,
        { method: "PATCH" }
    );
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
},

  createTask: async (taskData) => {
    const response = await fetch(`${API_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },
};
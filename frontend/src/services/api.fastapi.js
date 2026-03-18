import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getAuthHeader = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session ? { "Authorization": `Bearer ${session.access_token}` } : {};
};

export const taskService = {
  getAllTasks: async () => {
    const authHeader = await getAuthHeader();
    const response = await fetch(`${API_URL}/tasks/`, {
      headers: { ...authHeader }
    });
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

  createTask: async (taskData) => {
    const authHeader = await getAuthHeader();
    const response = await fetch(`${API_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  updateTask: async (taskId, isCompleted) => {
    const authHeader = await getAuthHeader();
    const response = await fetch(
      `${API_URL}/tasks/${taskId}?is_completed=${isCompleted}`,
      {
        method: "PATCH",
        headers: { ...authHeader }
      }
    );
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  },
};
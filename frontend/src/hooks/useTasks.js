import { useState, useEffect } from "react";
import { taskService } from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      await fetchTasks(); // re-fetch dari Supabase
    } catch (err) {
    setError(err.message);
    }
  };

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      await taskService.updateTask(taskId, !currentStatus);
      await fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return { tasks, loading, error, addTask, fetchTasks, toggleComplete };
};
import { supabase } from "./supabase";

const calculateSessions = (estimatedHours) => {
  const sessions = [];
  let remaining = estimatedHours;
  const sessionLength = 1.5;

  while (remaining > 0) {
    const duration = Math.min(sessionLength, remaining);
    sessions.push(`${duration} jam`);
    remaining -= duration;
    remaining = Math.round(remaining * 10) / 10;
  }

  return sessions;
};

const getReminderDate = (deadline, daysBefore) => {
  const date = new Date(deadline);
  date.setDate(date.getDate() - daysBefore);
  return date;
};

const isExpired = (deadline, isCompleted, daysAfter = 7) => {
  if (!isCompleted) return false;
  const cleanupDate = new Date(deadline);
  cleanupDate.setDate(cleanupDate.getDate() + daysAfter);
  return new Date() > cleanupDate;
};

export const taskService = {
  getAllTasks: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("deadline", { ascending: true });

    if (error) throw new Error(error.message);

    console.log("Data dari Supabase:", data);

    const expired = data.filter(task =>
      isExpired(task.deadline, task.is_completed)
    );

    console.log("Expired tasks:", expired);

    if (expired.length > 0) {
      await Promise.all(
        expired.map(task =>
          supabase.from("tasks").delete().eq("id", task.id)
        )
      );
      return data.filter(task =>
        !isExpired(task.deadline, task.is_completed)
      );
    }

    return data;
  },

  createTask: async (taskData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const sessions = calculateSessions(taskData.estimated_hours);
    const reminderDate = getReminderDate(
      taskData.deadline,
      taskData.reminder_days_before
    );

    const fixedDeadline = new Date(taskData.deadline + "T23:59:00").toISOString();

    console.log("Creating task with deadline:", fixedDeadline);

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        ...taskData,
        deadline: fixedDeadline,
        user_id: user.id,
        is_completed: false,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      task: data,
      sessions,
      reminder_date: reminderDate,
    };
  },

  updateTask: async (taskId, isCompleted) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_completed: isCompleted })
      .eq("id", taskId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },
};
import { useEffect } from "react";

export const useNotifications = (tasks) => {
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;
    checkAndNotify(tasks);
  }, [tasks]);

  const requestPermission = async () => {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    const permission = await Notification.requestPermission();
    return permission === "granted";
  };

  const checkAndNotify = async (tasks) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeTasks = tasks.filter(t => !t.is_completed);

    const urgentTasks = activeTasks.filter(task => {
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      const daysLeft = Math.round((deadline - today) / (1000 * 60 * 60 * 24));
      return daysLeft <= task.reminder_days_before && daysLeft >= 0;
    });

    if (urgentTasks.length === 0) return;

    const hasPermission = await requestPermission();
    if (hasPermission) {
      urgentTasks.forEach(task => {
        const deadline = new Date(task.deadline);
        deadline.setHours(0, 0, 0, 0);
        const today2 = new Date();
        today2.setHours(0, 0, 0, 0);
        const daysLeft = Math.round((deadline - today2) / (1000 * 60 * 60 * 24));

        new Notification(`⚠️ ${task.title}`, {
          body: daysLeft === 0
            ? `Deadline HARI INI! (${task.course_name})`
            : `${daysLeft} hari lagi — ${task.course_name}`,
        });
      });
    }
  };

  const getUrgentTasks = (tasks) => {
    if (!tasks) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter(task => {
      if (task.is_completed) return false;
      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);
      const daysLeft = Math.round((deadline - today) / (1000 * 60 * 60 * 24));
      return daysLeft <= task.reminder_days_before && daysLeft >= 0;
    });
  };

  return { getUrgentTasks };
};

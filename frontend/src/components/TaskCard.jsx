const TaskCard = ({ task }) => {
  const deadline = new Date(task.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  const getUrgencyColor = () => {
    if (daysLeft <= 1) return "#ef4444";
    if (daysLeft <= 3) return "#f97316";
    if (daysLeft <= 7) return "#eab308";
    return "#22c55e";
  };

  return (
    <div style={{
      border: `2px solid ${getUrgencyColor()}`,
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
    }}>
      <h3>{task.title}</h3>
      <p>📚 {task.course_name}</p>
      <p>⏰ Deadline: {deadline.toLocaleDateString("id-ID")}</p>
      <p style={{ color: getUrgencyColor(), fontWeight: "bold" }}>
        {daysLeft <= 0 ? "❌ Sudah lewat!" : `⏳ ${daysLeft} hari lagi`}
      </p>
      <p>🕐 Estimasi: {task.estimated_hours} jam</p>
    </div>
  );
};

export default TaskCard;
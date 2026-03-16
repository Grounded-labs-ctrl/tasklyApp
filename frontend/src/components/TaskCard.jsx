const TaskCard = ({ task, onToggleComplete }) => {
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
      border: `2px solid ${task.is_completed ? "#6b7280" : getUrgencyColor()}`,
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      opacity: task.is_completed ? 0.6 : 1,
    }}>
      <h3 style={{ textDecoration: task.is_completed ? "line-through" : "none" }}>
        {task.title}
      </h3>
      <p>📚 {task.course_name}</p>
      <p>⏰ Deadline: {deadline.toLocaleDateString("id-ID")}</p>
      {!task.is_completed && (
        <p style={{ color: getUrgencyColor(), fontWeight: "bold" }}>
          {daysLeft <= 0 ? "❌ Sudah lewat!" : `⏳ ${daysLeft} hari lagi`}
        </p>
      )}
      <p>🕐 Estimasi: {task.estimated_hours} jam</p>
      <button
        onClick={() => onToggleComplete(task.id, task.is_completed)}
        style={{
          marginTop: "8px",
          padding: "6px 12px",
          background: task.is_completed ? "#6b7280" : "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {task.is_completed ? "↩️ Batalkan" : "✅ Selesai"}
      </button>
    </div>
  );
};

export default TaskCard;
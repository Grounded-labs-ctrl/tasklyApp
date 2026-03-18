const TaskCard = ({ task, onToggleComplete }) => {
  const deadline = new Date(task.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  const getUrgencyConfig = () => {
    if (task.is_completed) return { bg: '#e8e8e8', accent: '#999', label: 'Selesai! 🎉' };
    if (daysLeft <= 0) return { bg: '#FFE5E5', accent: 'var(--pink)', label: 'Udah lewat! 😱' };
    if (daysLeft <= 2) return { bg: '#FFF3E0', accent: 'var(--orange)', label: `${daysLeft} hari lagi 🔥` };
    if (daysLeft <= 7) return { bg: '#FFFDE7', accent: 'var(--yellow)', label: `${daysLeft} hari lagi ⚡` };
    return { bg: '#E8F8F5', accent: 'var(--green)', label: `${daysLeft} hari lagi 😎` };
  };

  const config = getUrgencyConfig();

  return (
    <div
      className="rounded-3xl p-5 mb-4 shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
      style={{
        background: config.bg,
        border: `3px solid ${config.accent}`,
        opacity: task.is_completed ? 0.7 : 1,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3
          className="text-lg font-black leading-tight flex-1 mr-2"
          style={{
            color: 'var(--dark)',
            textDecoration: task.is_completed ? 'line-through' : 'none'
          }}
        >
          {task.title}
        </h3>
        <span
          className="text-xs font-black px-3 py-1 rounded-full whitespace-nowrap"
          style={{ background: config.accent, color: 'white' }}
        >
          {config.label}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: 'var(--purple)', color: 'white' }}>
          📚 {task.course_name}
        </span>
        <span className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: 'var(--blue)', color: 'white' }}>
          ⏰ {deadline.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <span className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: 'var(--orange)', color: 'white' }}>
          🕐 {task.estimated_hours} jam
        </span>
      </div>

      {/* Button */}
      <button
        onClick={() => onToggleComplete(task.id, task.is_completed)}
        className="w-full py-2 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95"
        style={{
          background: task.is_completed ? '#999' : 'var(--dark)',
          color: task.is_completed ? 'white' : 'var(--yellow)',
        }}
      >
        {task.is_completed ? '↩️ Batalkan' : '✅ Tandai Selesai'}
      </button>
    </div>
  );
};

export default TaskCard;
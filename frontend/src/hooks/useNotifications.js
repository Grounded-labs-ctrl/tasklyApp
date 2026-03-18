import { useTasks } from "../hooks/useTasks";
import { useNotifications } from "../hooks/useNotifications";
import TaskCard from "../components/TaskCard";

const TaskList = () => {
  const { tasks, loading, error, toggleComplete } = useTasks();
  const getUrgentTasks = (tasks) => {
  if (!tasks) return [];
  const now = new Date();
  
  return tasks.filter(task => {
    if (task.is_completed) return false;
    const deadline = new Date(task.deadline);
    const diffMs = deadline - now;
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return daysLeft <= task.reminder_days_before && daysLeft >= 0;
  });
};

  if (loading) return (
    <div className="text-center py-16">
      <div className="text-6xl animate-bounce mb-4">📋</div>
      <p className="font-black text-xl" style={{ color: 'var(--dark)' }}>
        Ngambil tugas lo...
      </p>
    </div>
  );

  if (error) return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">😵</div>
      <p className="font-black text-xl" style={{ color: 'var(--pink)' }}>
        Error: {error}
      </p>
    </div>
  );

  const activeTasks = tasks.filter(t => !t.is_completed);
  const completedTasks = tasks.filter(t => t.is_completed);
  const urgentTasks = getUrgentTasks(tasks);

  return (
    <div>
      {/* Urgent Alert Banner */}
      {urgentTasks.length > 0 && (
        <div
          className="rounded-3xl p-4 mb-6 border-3"
          style={{
            background: '#FFF3E0',
            border: '3px solid var(--orange)',
            animation: 'pulse 2s infinite'
          }}
        >
          <p className="font-black text-lg mb-2" style={{ color: 'var(--orange)' }}>
            🔥 Deadline Mepet!
          </p>
          {urgentTasks.map(task => {
            const daysLeft = Math.ceil(
              (new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24)
            );
            return (
              <div key={task.id} className="flex justify-between items-center py-1">
                <span className="font-bold text-sm" style={{ color: 'var(--dark)' }}>
                  📚 {task.title}
                </span>
                <span
                  className="text-xs font-black px-2 py-1 rounded-full"
                  style={{
                    background: daysLeft === 0 ? 'var(--pink)' : 'var(--orange)',
                    color: 'white'
                  }}
                >
                  {daysLeft === 0 ? 'HARI INI!' : `${daysLeft} hari lagi`}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
            Tugas Gw 📚
          </h2>
          <p className="font-semibold" style={{ color: '#888' }}>
            {activeTasks.length} tugas aktif · {completedTasks.length} selesai
          </p>
        </div>
        {tasks.length > 0 && (
          <div className="text-right">
            <p className="text-xs font-black mb-1" style={{ color: 'var(--dark)' }}>
              {Math.round((completedTasks.length / tasks.length) * 100)}% done
            </p>
            <div className="w-24 h-3 rounded-full overflow-hidden" style={{ background: '#e0e0e0' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(completedTasks.length / tasks.length) * 100}%`,
                  background: 'var(--green)'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {tasks.length === 0 && (
        <div className="text-center py-16">
          <div className="text-7xl mb-4">🎉</div>
          <h3 className="text-2xl font-black mb-2" style={{ color: 'var(--dark)' }}>
            Kosong nih!
          </h3>
          <p className="font-semibold" style={{ color: '#888' }}>
            Ga ada tugas? Lo beruntung banget 😎
          </p>
        </div>
      )}

      {/* Active tasks */}
      {activeTasks.length > 0 && (
        <div className="mb-6">
          {activeTasks.map(task => (
            <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} />
          ))}
        </div>
      )}

      {/* Completed tasks */}
      {completedTasks.length > 0 && (
        <div>
          <p className="text-sm font-black mb-3" style={{ color: '#aaa' }}>
            ✅ UDAH SELESAI
          </p>
          {completedTasks.map(task => (
            <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
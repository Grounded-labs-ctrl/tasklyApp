import { useTasks } from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";

const TaskList = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>📋 Taskly</h1>
      {tasks.length === 0 ? (
        <p>Belum ada tugas. Tambah sekarang!</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;
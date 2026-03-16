import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

const AddTask = ({ onTaskAdded }) => {
  const { addTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    deadline: "",
    estimated_hours: "",
    course_name: "",
    reminder_days_before: 2,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTask({
        ...form,
        estimated_hours: parseFloat(form.estimated_hours),
        reminder_days_before: parseInt(form.reminder_days_before),
        deadline: new Date(form.deadline).toISOString(),
      });
      setForm({
        title: "",
        deadline: "",
        estimated_hours: "",
        course_name: "",
        reminder_days_before: 2,
      });
      if (onTaskAdded) onTaskAdded();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>➕ Tambah Tugas</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <input
            name="title"
            placeholder="Nama tugas"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            name="course_name"
            placeholder="Mata kuliah"
            value={form.course_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            name="deadline"
            type="datetime-local"
            value={form.deadline}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            name="estimated_hours"
            type="number"
            placeholder="Estimasi jam"
            value={form.estimated_hours}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <input
            name="reminder_days_before"
            type="number"
            placeholder="Ingatkan H- berapa?"
            value={form.reminder_days_before}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          {loading ? "Menyimpan..." : "Simpan Tugas"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
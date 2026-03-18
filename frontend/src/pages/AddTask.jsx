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
      onTaskAdded();
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "16px",
    border: "3px solid #e0e0e0",
    fontSize: "15px",
    fontFamily: "Nunito, sans-serif",
    fontWeight: "700",
    outline: "none",
    background: "white",
    color: "var(--dark)",
    transition: "border-color 0.2s",
  };

  const fields = [
    { name: "title", placeholder: "Nama tugas", emoji: "📝", type: "text" },
    { name: "course_name", placeholder: "Mata kuliah", emoji: "📚", type: "text" },
    { name: "deadline", placeholder: "Deadline", emoji: "⏰", type: "datetime-local" },
    { name: "estimated_hours", placeholder: "Estimasi jam ngerjain", emoji: "🕐", type: "number" },
    { name: "reminder_days_before", placeholder: "Ingatkan H- berapa?", emoji: "🔔", type: "number" },
  ];

  const colors = ['var(--yellow)', 'var(--pink)', 'var(--blue)', 'var(--orange)', 'var(--purple)'];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
          Tambah Tugas ✏️
        </h2>
        <p className="font-semibold" style={{ color: '#888' }}>
          Catat sekarang sebelum lupa!
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          {fields.map((field, i) => (
            <div key={field.name} className="relative">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 text-lg"
                style={{ zIndex: 1 }}
              >
                {field.emoji}
              </div>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required={field.name !== "reminder_days_before"}
                style={{
                  ...inputStyle,
                  paddingLeft: "44px",
                }}
                onFocus={e => e.target.style.borderColor = colors[i]}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl font-black text-lg mt-6 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: loading ? '#ccc' : 'var(--dark)',
            color: loading ? '#999' : 'var(--yellow)',
          }}
        >
          {loading ? "⏳ Menyimpan..." : "💾 Simpan Tugas"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
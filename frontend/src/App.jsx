import { useState } from "react";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";

function App() {
  const [page, setPage] = useState("list");

  return (
    <div>
      <nav style={{ padding: "12px 20px", borderBottom: "1px solid #ccc" }}>
        <button onClick={() => setPage("list")} style={{ marginRight: "12px" }}>
          📋 Daftar Tugas
        </button>
        <button onClick={() => setPage("add")}>➕ Tambah Tugas</button>
      </nav>
      {page === "list" ? <TaskList /> : <AddTask onTaskAdded={() => setPage("list")} />}
    </div>
  );
}

export default App;
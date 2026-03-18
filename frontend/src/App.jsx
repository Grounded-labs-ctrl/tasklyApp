import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";

function App() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [page, setPage] = useState("list");

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (!user) return <Login onLogin={signInWithGoogle} />;

  return (
    <div>
      <nav style={{
        padding: "12px 20px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <button onClick={() => setPage("list")} style={{ marginRight: "12px" }}>
            📋 Daftar Tugas
          </button>
          <button onClick={() => setPage("add")}>
            ➕ Tambah Tugas
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "14px" }}>👤 {user.email}</span>
          <button onClick={signOut}>Logout</button>
        </div>
      </nav>
      {page === "list" ? (
        <TaskList />
      ) : (
        <AddTask onTaskAdded={() => setPage("list")} />
      )}
    </div>
  );
}

export default App;
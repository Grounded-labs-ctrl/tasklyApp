import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";

function App() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [page, setPage] = useState("list");

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-bold animate-bounce" style={{ color: 'var(--pink)' }}>
        Loading...
      </p>
    </div>
  );

  if (!user) return <Login onLogin={signInWithGoogle} />;

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav style={{ background: 'var(--dark)' }} className="px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-black text-white">
            📋 Taskly
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setPage("list")}
              className="px-4 py-2 rounded-full font-bold text-sm transition-all"
              style={{
                background: page === "list" ? 'var(--yellow)' : 'transparent',
                color: page === "list" ? 'var(--dark)' : 'white',
                border: '2px solid',
                borderColor: page === "list" ? 'var(--yellow)' : 'rgba(255,255,255,0.3)'
              }}
            >
              📚 Tugas Gw
            </button>
            <button
              onClick={() => setPage("add")}
              className="px-4 py-2 rounded-full font-bold text-sm transition-all"
              style={{
                background: page === "add" ? 'var(--pink)' : 'transparent',
                color: page === "add" ? 'white' : 'white',
                border: '2px solid',
                borderColor: page === "add" ? 'var(--pink)' : 'rgba(255,255,255,0.3)'
              }}
            >
              ✏️ Tambah
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full text-white"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            👤 {user.email.split('@')[0]}
          </span>
          <button
            onClick={signOut}
            className="px-3 py-1 rounded-full text-xs font-bold transition-all hover:opacity-80"
            style={{ background: 'var(--pink)', color: 'white' }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {page === "list" ? (
          <TaskList />
        ) : (
          <AddTask onTaskAdded={() => setPage("list")} />
        )}
      </div>
    </div>
  );
}

export default App;
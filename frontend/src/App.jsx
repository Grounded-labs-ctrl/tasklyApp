import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useTasks } from "./hooks/useTasks";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";

function App() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [page, setPage] = useState("list");
  const taskHook = useTasks();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-bold animate-bounce" style={{ color: 'var(--pink)' }}>
        Loading...
      </p>
    </div>
  );

  if (!user) return <Login onLogin={signInWithGoogle} />;

  return (
    <div className="min-h-screen" style={{ paddingBottom: '80px' }}>
      {/* Top navbar - simple */}
      <nav style={{ background: 'var(--dark)' }} className="px-4 py-3 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-black text-white">📋 Taskly</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-1 rounded-full text-white"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            👤 {user.email.split('@')[0]}
          </span>
          <button
            onClick={signOut}
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'var(--pink)', color: 'white' }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {page === "list" ? (
          <TaskList taskHook={taskHook} />
        ) : (
          <AddTask taskHook={taskHook} onTaskAdded={() => setPage("list")} />
        )}
      </div>

      {/* Bottom navigation - mobile friendly */}
      <nav className="fixed bottom-0 left-0 right-0 flex shadow-lg"
        style={{ background: 'var(--dark)', zIndex: 100 }}>
        <button
          onClick={() => setPage("list")}
          className="flex-1 py-4 flex flex-col items-center gap-1 font-black text-xs transition-all"
          style={{
            color: page === "list" ? 'var(--yellow)' : 'rgba(255,255,255,0.5)',
            borderTop: page === "list" ? '3px solid var(--yellow)' : '3px solid transparent'
          }}
        >
          <span className="text-xl">📚</span>
          Tugas Gw
        </button>
        <button
          onClick={() => setPage("add")}
          className="flex-1 py-4 flex flex-col items-center gap-1 font-black text-xs transition-all"
          style={{
            color: page === "add" ? 'var(--pink)' : 'rgba(255,255,255,0.5)',
            borderTop: page === "add" ? '3px solid var(--pink)' : '3px solid transparent'
          }}
        >
          <span className="text-xl">✏️</span>
          Tambah
        </button>
      </nav>
    </div>
  );
}

export default App;
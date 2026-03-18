const Login = ({ onLogin }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "16px"
    }}>
      <h1>📋 Taskly</h1>
      <p>Manage tugas kuliah lo dengan lebih smart.</p>
      <button
        onClick={onLogin}
        style={{
          padding: "12px 24px",
          background: "#4285f4",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        🔑 Login dengan Google
      </button>
    </div>
  );
};

export default Login;
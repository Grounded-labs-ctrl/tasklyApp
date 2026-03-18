const Login = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        
        {/* Logo area */}
        <div className="mb-8">
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-4 shadow-lg"
            style={{ background: 'var(--dark)', transform: 'rotate(-6deg)' }}
          >
            📋
          </div>
          <h1 className="text-5xl font-black mb-2" style={{ color: 'var(--dark)' }}>
            Taskly
          </h1>
          <p className="text-lg font-semibold" style={{ color: '#666' }}>
            Tugas kuliah lo, tapi lebih <span style={{ color: 'var(--pink)' }}>organized</span> ✨
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { emoji: "⏰", text: "Reminder otomatis" },
            { emoji: "📊", text: "Breakdown sesi" },
            { emoji: "🎯", text: "Semua device" },
          ].map((f, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl text-center font-bold text-sm"
              style={{
                background: [
                  'var(--yellow)', 'var(--blue)', 'var(--pink)'
                ][i],
                color: i === 2 ? 'white' : 'var(--dark)',
                transform: `rotate(${[-2, 1, -1][i]}deg)`
              }}
            >
              <div className="text-2xl mb-1">{f.emoji}</div>
              {f.text}
            </div>
          ))}
        </div>

        {/* Login button */}
        <button
          onClick={onLogin}
          className="w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          style={{ background: 'var(--dark)', color: 'var(--yellow)' }}
        >
          <span>🔑</span>
          <span>Login dengan Google</span>
        </button>

        <p className="mt-4 text-xs font-semibold" style={{ color: '#aaa' }}>
          Gratis. Ga ada iklan. Data lo aman.
        </p>
      </div>
    </div>
  );
};

export default Login;
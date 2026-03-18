# 📋 Taskly

> Aplikasi manajemen tugas kuliah yang smart — dibuat karena capek ngerjain tugas mepet deadline.

![Tech Stack](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## ✨ Fitur

- **Google Auth** — login sekali, data lo aman dan terisolasi per user
- **Smart Reminder** — diingetin H-X sebelum deadline, bukan pas udah mepet
- **Breakdown Sesi** — tugas dipecah jadi sesi-sesi kerja yang manageable
- **Auto Cleanup** — tugas selesai otomatis kehapus 7 hari setelah deadline
- **Multi Device** — akses dari HP, laptop, device apapun

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Python + FastAPI |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + Google OAuth |
| Deploy | Vercel (frontend) + Render (backend) |

## 🏗️ Arsitektur
```
tasklyApp/
├── backend/
│   ├── main.py              # Entry point FastAPI
│   ├── database.py          # Supabase client
│   ├── models/
│   │   └── task.py          # Pydantic models
│   ├── routes/
│   │   └── task_routes.py   # API endpoints
│   └── services/
│       └── task_service.py  # Business logic
└── frontend/
    └── src/
        ├── components/      # Reusable UI components
        ├── pages/           # Halaman utama
        ├── hooks/           # Custom React hooks
        └── services/        # API & Supabase client
```

## 🚀 Cara Jalanin Local

### Prerequisites
- Python 3.12+
- Node.js 20+
- Akun Supabase

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Bikin file `.env` di folder `backend/`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

Jalanin:
```bash
uvicorn main:app --reload
```

Backend jalan di `http://localhost:8000` — cek dokumentasi API di `/docs`

### Frontend
```bash
cd frontend
npm install
```

Bikin file `.env` di folder `frontend/`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

Jalanin:
```bash
npm run dev
```

Frontend jalan di `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/tasks/` | Ambil semua tugas user |
| POST | `/tasks/` | Tambah tugas baru |
| PATCH | `/tasks/{id}` | Update status selesai |

## 🔒 Security

- JWT token verification di setiap request
- Row Level Security (RLS) di Supabase
- Environment variables untuk semua credentials
- Per-user data isolation

## 👨‍💻 Developer

Dibuat oleh **Al Hadi** — IT & Business student yang capek ngerjain tugas mepet deadline.

> "Jadi arsitek, bukan tukang."

from fastapi import APIRouter
from models.task import TaskCreate
from services.task_service import calculate_sessions, get_reminder_date
from database import supabase

router = APIRouter()

@router.get("/")
def get_tasks():
    response = supabase.table("tasks").select("*").execute()
    return response.data

@router.post("/")
def create_task(task: TaskCreate):
    sessions = calculate_sessions(task.estimated_hours)
    reminder_date = get_reminder_date(task.deadline, task.reminder_days_before)
    
    task_data = {
        "title": task.title,
        "deadline": task.deadline.isoformat(),
        "estimated_hours": task.estimated_hours,
        "course_name": task.course_name,
        "reminder_days_before": task.reminder_days_before,
        "is_completed": False
    }
    
    response = supabase.table("tasks").insert(task_data).execute()
    
    return {
        "task": response.data[0],
        "sessions": sessions,
        "reminder_date": reminder_date
    }
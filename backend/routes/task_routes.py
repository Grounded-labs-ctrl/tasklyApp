from fastapi import APIRouter
from models.task import TaskCreate
from services.task_service import calculate_sessions, get_reminder_date
from database import supabase
from datetime import datetime
from services.task_service import calculate_sessions, get_reminder_date, is_expired
router = APIRouter()

@router.get("/")
def get_tasks():
    response = supabase.table("tasks").select("*").execute()
    tasks = response.data
    
    # Auto cleanup expired tasks
    for task in tasks:
        deadline = datetime.fromisoformat(task["deadline"].replace("Z", "+00:00"))
        if is_expired(deadline, task["is_completed"]):
            supabase.table("tasks").delete().eq("id", task["id"]).execute()
    
    # Return fresh data after cleanup
    fresh = supabase.table("tasks").select("*").execute()
    return fresh.data

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
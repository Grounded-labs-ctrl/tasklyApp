from fastapi import APIRouter
from models.task import TaskCreate, TaskResponse
from services.task_service import calculate_sessions, get_reminder_date

router = APIRouter()

@router.get("/")
def get_tasks():
    return {"message": "Get all tasks - coming soon"}

@router.post("/")
def create_task(task: TaskCreate):
    sessions = calculate_sessions(task.estimated_hours)
    reminder_date = get_reminder_date(task.deadline, task.reminder_days_before)
    
    return {
        "message": "Task received",
        "task": task,
        "sessions": sessions,
        "reminder_date": reminder_date
    }

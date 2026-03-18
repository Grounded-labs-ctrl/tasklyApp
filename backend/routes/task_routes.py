from fastapi import APIRouter, Header, HTTPException
from typing import Optional
from datetime import datetime
from models.task import TaskCreate
from services.task_service import calculate_sessions, get_reminder_date, is_expired
from database import get_user_from_token, get_supabase_with_token

router = APIRouter()

def get_current_user_and_client(authorization: Optional[str] = None):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.replace("Bearer ", "")
    user = get_user_from_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    client = get_supabase_with_token(token)
    return user, client

@router.get("/")
def get_tasks(authorization: Optional[str] = Header(None)):
    user, client = get_current_user_and_client(authorization)
    
    response = client.table("tasks").select("*").eq("user_id", user.id).execute()
    tasks = response.data
    
    for task in tasks:
        deadline = datetime.fromisoformat(task["deadline"].replace("Z", "+00:00"))
        if is_expired(deadline, task["is_completed"]):
            client.table("tasks").delete().eq("id", task["id"]).execute()
    
    fresh = client.table("tasks").select("*").eq("user_id", user.id).execute()
    return fresh.data

@router.post("/")
def create_task(task: TaskCreate, authorization: Optional[str] = Header(None)):
    user, client = get_current_user_and_client(authorization)
    sessions = calculate_sessions(task.estimated_hours)
    reminder_date = get_reminder_date(task.deadline, task.reminder_days_before)
    
    task_data = {
        "title": task.title,
        "deadline": task.deadline.isoformat(),
        "estimated_hours": task.estimated_hours,
        "course_name": task.course_name,
        "reminder_days_before": task.reminder_days_before,
        "is_completed": False,
        "user_id": user.id
    }
    
    response = client.table("tasks").insert(task_data).execute()
    
    return {
        "task": response.data[0],
        "sessions": sessions,
        "reminder_date": reminder_date
    }

@router.patch("/{task_id}")
def update_task(task_id: str, is_completed: bool, authorization: Optional[str] = Header(None)):
    user, client = get_current_user_and_client(authorization)
    
    response = client.table("tasks")\
        .update({"is_completed": is_completed})\
        .eq("id", task_id)\
        .eq("user_id", user.id)\
        .execute()
    return response.data[0]
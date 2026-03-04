from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    deadline: datetime
    estimated_hours: float
    course_name: str
    reminder_days_before: int = 2

class TaskResponse(BaseModel):
    id: str
    title: str
    deadline: datetime
    estimated_hours: float
    course_name: str
    reminder_days_before: int
    is_completed: bool
    created_at: datetime
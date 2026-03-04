from models.task import TaskCreate
from datetime import datetime, timedelta

def calculate_sessions(estimated_hours: float) -> list:
    sessions = []
    remaining = estimated_hours
    session_length = 1.5
    
    while remaining > 0:
        duration = min(session_length, remaining)
        sessions.append(f"{duration} jam")
        remaining -= duration
    
    return sessions

def get_reminder_date(deadline: datetime, days_before: int) -> datetime:
    return deadline - timedelta(days=days_before)

def should_remind_today(deadline: datetime, days_before: int) -> bool:
    reminder_date = get_reminder_date(deadline, days_before)
    today = datetime.now().date()
    return reminder_date.date() == today
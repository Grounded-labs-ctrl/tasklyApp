from models.task import TaskCreate
from datetime import datetime, timedelta, timezone

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
    today = datetime.now(timezone.utc).date()
    return reminder_date.date() == today

def is_expired(deadline: datetime, is_completed: bool, days_after: int = 7) -> bool:
    if not is_completed:
        return False
    cleanup_date = deadline + timedelta(days=days_after)
    return datetime.now(timezone.utc) > cleanup_date
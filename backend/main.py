from fastapi import FastAPI
from routes.task_routes import router as task_router

app = FastAPI(
    title="Taskly API",
    description="Academic task management API",
    version="0.1.0"
)

app.include_router(task_router, prefix="/tasks", tags=["tasks"])

@app.get("/")
def root():
    return {"message": "Taskly API is running"}
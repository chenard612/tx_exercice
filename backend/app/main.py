from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database.database import init_db
from app.api.assets import router as assets_router
from settings import UPLOAD_DIR 

app = FastAPI(title="Reporting-Tool API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/uploaded_images",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploaded_images",
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(assets_router)

@app.get("/")
def health():
    return {"status": "ok"}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import init_db
from app.api.assets import router as assets_router

app = FastAPI(title="Reporting-Tool API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# app.include_router(assets_router, prefix="/assets", tags=["Assets"])
app.include_router(assets_router)

@app.get("/")
def health():
    return {"status": "ok"}
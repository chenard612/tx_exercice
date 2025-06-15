from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlmodel import Session, select
from pydantic import BaseModel
from app.database.database import get_session
from typing import List
import uuid, os

from app.database.models import Note, Image

router = APIRouter()

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[Note | Image])
def list_assets(session: Session = Depends(get_session)):
    notes:  List[Note]  = session.exec(select(Note)).all()
    images: List[Image] = session.exec(select(Image)).all()

    combined = sorted((*notes, *images), key=lambda a: a.id)

    return combined

@router.get("/notes", response_model=List[Note])
def list_notes(session: Session = Depends(get_session)):
    return session.exec(select(Note)).all()

@router.post("/notes", response_model=Note, status_code=201)
def create_note(payload: Note, session: Session = Depends(get_session)):
    session.add(payload)
    session.commit()
    session.refresh(payload)
    return payload

@router.get("/images", response_model=List[Image])
def list_images(session: Session = Depends(get_session)):
    return session.exec(select(Image)).all()

@router.post("/images", response_model=Image, status_code=201)
async def create_image(
    title: str = Form(...),
    file: UploadFile = File(...),
    session: Session = Depends(get_session)
):
    ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as out:
        out.write(await file.read())

    img = Image(title=title, url=f"/{UPLOAD_DIR}/{filename}")
    session.add(img)
    session.commit()
    session.refresh(img)
    return img
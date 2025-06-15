from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from app.database.database import get_session
from typing import List

from app.database.models import Note, Image

router = APIRouter()


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
def create_image(payload: Image, session: Session = Depends(get_session)):
    session.add(payload)
    session.commit()
    session.refresh(payload)
    return payload
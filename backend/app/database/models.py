from sqlmodel import SQLModel, Field
from typing import Optional, List
from sqlalchemy import Column, JSON
import uuid, datetime

class Note(SQLModel, table=True):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex, primary_key=True)
    type: str = "note"
    title: Optional[str] = None
    text: Optional[str] = None
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

class Image(SQLModel, table=True):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex, primary_key=True)
    type: str = "image"
    title: Optional[str] = None
    url: str
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)

class Table(SQLModel, table=True):
    id: str = Field(default_factory=lambda: uuid.uuid4().hex, primary_key=True)
    type: str = "table"
    title: str
    rows: List[List[str]] = Field(
        sa_column=Column(JSON)
    )
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)
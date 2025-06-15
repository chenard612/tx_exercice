from sqlmodel import SQLModel, Field
from typing import Optional

class Note(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type: str
    title: Optional[str] = None
    text: Optional[str] = None

class Image(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type: str = "image"
    title: Optional[str] = None
    url: str     
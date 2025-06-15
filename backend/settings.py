import os, uuid
from pathlib import Path

BASE_DIR   = Path(__file__).resolve().parent.parent  
UPLOAD_DIR = BASE_DIR / "uploaded_images"
UPLOAD_DIR.mkdir(exist_ok=True)
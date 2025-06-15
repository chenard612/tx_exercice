# TX Exercice

A FastAPI application that downloads CSV files describing natural gas shipments, parses and validates them, and inserts the data into a PostgreSQL database.

---

## Technologies Used

- **FastAPI** (async Python web framework)
- **Uvicorn** (ASGI server)
- **SQLAlchemy** (ORM)
- **PostgreSQL** (relational database)
- **Docker Compose** (for running PostgreSQL locally)
- **BeautifulSoup** & **Requests** (for HTML parsing and HTTP requests)

---

## Requirements

- Python 3.10+
- Docker & Docker Compose

---

## Project Setup

## Activate the virtual env and install dependencies:

```bash
python3 -m venv .tx_venv

source .venv/bin/activate

pip install -r requirements.txt
```

## Configure the Database. 


## Run the server with this command:
This starts the FastAPI server on port 8000.

```bash
uvicorn app.main:app --reload
```

## Run the Query
Run this curl inside the command line to trigger the query of the CSV, its parsing and its insertion in the database.

```bash
curl -X POST http://localhost:8000/
```

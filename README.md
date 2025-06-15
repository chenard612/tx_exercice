# TX Exercice

- A **FastAPI** application that downloads CSV files describing natural gas shipments, parses and validates them, and inserts the data into a PostgreSQL database.
- A **React (Next.js)** frontend for building custom reports with drag-and-drop layout tools.

---

## Technologies Used

- **FastAPI**               (async Python web framework)
- **Uvicorn**               (ASGI server)
- **SQLAlchemy**            (ORM)
- **Next.js 14**            (React framework with App Router and SSR)
- **TypeScript**            (static typing)
- **Tailwind CSS**          (utility-first styling)
- **react-grid-layout**     (drag-and-drop layout builder)
- **MUI (Material UI)**     (ready-to-use components)
- **Recharts**              (charting library for visualizations)
- **faker.js**              (generate sample data)
- **SWR**                   (data fetching and caching)
- **Axios**                 (HTTP client)

---

## Requirements

- Python 3.10+
- Node.js 18+ and pnpm (`corepack enable` to activate)

---

## Project Setup

## Activate the virtual env and install dependencies:

```bash
python3 -m venv .tx_venv

source .venv/bin/activate

pip install -r requirements.txt
```

## Run the server with this command:
This starts the FastAPI server on port 8000.

```bash
uvicorn app.main:app --reload
```

## Run the frotnend with this command:
This starts the NextJS server on port 3000.

```bash
pnpm dev
```

1. Clone the Repository
git clone <[YOUR_REPO_URL](https://github.com/Chinmay-OO7/240KW-M2P3_4.git)>

2. Start the Backend (FastAPI)

Move into the backend folder:
cd backend

Create a virtual environment
python -m venv .venv

Activate the virtual environment (Windows)
.venv\Scripts\activate

Install dependencies
pip install -r requirements.txt

Run the backend server
uvicorn main:app --reload

Backend will run at:
http://127.0.0.1:8000

3. Start the Frontend (React)

Open a new terminal, then:
cd frontend

Install dependencies:
npm install

Run the frontend:
npm run dev

Frontend will run (typically) at:
http://localhost:5173

✔️ Done!

Backend: http://127.0.0.1:8000
Frontend: http://localhost:5173

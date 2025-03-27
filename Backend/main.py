from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS so React can communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this if your frontend is running elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body format
class DebugRequest(BaseModel):
    blocks: list

# Sample debugging function
@app.post("/debug")
async def debug_blocks(request: DebugRequest):
    # Simple rule-based debugging
    errors = []
    for block in request.blocks:
        if block["type"] == "loop":
            errors.append({"error": "Infinite Loop Detected", "suggestion": "Check loop condition"})

    return {"errors": errors}



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Tuple
import requests
import os
from ai_logic import generate_answer
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Twitter Clone Config
TWITTER_API_KEY = "victor_19f26690c87a600518e74ab8023a1c08"
TWITTER_POST_ENDPOINT = "https://twitterclone-server-2xz2.onrender.com/post_tweet"

# Pydantic model
class QuestionData(BaseModel):
    username: str
    question: str

# Function to post to Twitter clone
def post_to_twitter_clone(username: str, text: str) -> Tuple[bool, str]:
    headers = {
        "api-key": TWITTER_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "username": username,
        "text": text
    }

    try:
        response = requests.post(TWITTER_POST_ENDPOINT, json=payload, headers=headers)

        if response.status_code == 200:
            return True, "✅ Tweet posted successfully."
        else:
            return False, f"❌ Failed to post tweet: {response.status_code} - {response.text}"

    except requests.exceptions.RequestException as e:
        return False, f"❌ Request error: {str(e)}"

# Main ask endpoint
@app.post("/ask")
async def ask_question(data: QuestionData):
    try:
        answer = generate_answer(data.question)
        # Trim to 300 words if needed
        words = answer.split()
        if len(words) > 300:
            answer = " ".join(words[:300]) + "..."
    except Exception as e:
        return {"answer": f"❌ Error generating answer: {str(e)}"}

    # Post to Twitter Clone
    success, message = post_to_twitter_clone(data.username, answer)

    if success:
        return {"answer": answer}
    else:
        return {"answer": answer + f"\n{message}"}

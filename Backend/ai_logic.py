from typing import Optional
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda
from langchain_openai import ChatOpenAI
import os

# load from environment
API_KEY = os.getenv("OPENAI_API_KEY")
API_BASE = "https://openrouter.ai/api/v1"
MODEL_TEXT = "mistralai/mistral-small-3.2-24b-instruct:free"
MODEL_VISION = "mistralai/mistral-small-3.2-24b-instruct:free"

def generate_answer(question: str, image_url: Optional[str] = None) -> str:
    if image_url:
        # vision branch
        from openai import OpenAI
        client = OpenAI(
            base_url=API_BASE,
            api_key=API_KEY
        )
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost",
                "X-Title": "AI Twitter Autopost",
            },
            model=MODEL_VISION,
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": question},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }]
        )
        return completion.choices[0].message.content

    # text-only branch
    llm = ChatOpenAI(
        openai_api_key=API_KEY,
        openai_api_base=API_BASE,
        model=MODEL_TEXT,
        temperature=0.7
    )
    prompt = PromptTemplate.from_template("Answer the following question: {question}")
    chain = prompt | llm
    result = chain.invoke({"question": question})
    return result.content

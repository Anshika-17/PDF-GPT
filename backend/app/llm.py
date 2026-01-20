import os
from groq import Groq
from dotenv import load_dotenv
from pathlib import Path

# Explicitly load .env from backend folder
load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / ".env")

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_answer(context: str, question: str) -> str:
    prompt = f"""
Answer the question ONLY using the context below.
If the answer is not present, say "I don't know".

Context:
{context}

Question:
{question}
"""
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )
    return response.choices[0].message.content

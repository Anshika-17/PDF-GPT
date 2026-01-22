from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, UploadFile, File
from app.pdf_utils import extract_text
from app.chunking import chunk_text
from app.embeddings import embed_texts
from app.database import chunks_collection
from app.search import find_top_chunks

app = FastAPI(title="PDF AI Chatbot")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "Backend running successfully"}

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    text = extract_text(file.file)
    chunks = chunk_text(text)
    embeddings = embed_texts(chunks)

    chunks_collection.delete_many({})

    for chunk, embedding in zip(chunks, embeddings):
        chunks_collection.insert_one({
            "text": chunk,
            "embedding": embedding
        })

    return {
        "stored_chunks": len(chunks)
    }

from app.llm import generate_answer

@app.post("/chat")
async def chat(question: str):
    query_embedding = embed_texts([question])[0]
    documents = list(chunks_collection.find())

    if not documents:
        return {"answer": "No PDF uploaded yet."}

    top_chunks = find_top_chunks(query_embedding, documents)
    context = " ".join(top_chunks)

    answer = generate_answer(context, question)

    return {
        "question": question,
        "answer": answer
    }


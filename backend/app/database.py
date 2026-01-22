import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")

client = MongoClient(MONGODB_URI, tls=True, tlsAllowInvalidCertificates=True)

db = client["pdf_ai_chatbot"]
chunks_collection = db["chunks"]

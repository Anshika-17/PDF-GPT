from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["pdf_ai_chatbot"]
chunks_collection = db["chunks"]

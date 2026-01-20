from sentence_transformers import SentenceTransformer

# Load model once (VERY IMPORTANT for performance)
model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_texts(texts):
    embeddings = model.encode(
        texts,
        convert_to_numpy=True,
        normalize_embeddings=True
    )
    return embeddings.tolist()

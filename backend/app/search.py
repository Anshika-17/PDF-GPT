import numpy as np

def find_top_chunks(query_embedding, documents, top_k=3):
    scores = []

    for doc in documents:
        score = np.dot(query_embedding, doc["embedding"])
        scores.append((score, doc["text"]))

    scores.sort(reverse=True, key=lambda x: x[0])
    return [text for _, text in scores[:top_k]]

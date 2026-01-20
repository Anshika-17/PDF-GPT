# 📄 PDF GPT

A modern AI-powered chatbot that lets you chat with your PDF documents. Upload any PDF and ask questions about its content using multiple LLM models.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?logo=mongodb)

## ✨ Features

- 📤 **Drag & Drop PDF Upload** - Easy file upload with status indicators
- 💬 **ChatGPT-style Interface** - Modern dark/light theme with smooth animations
- 🤖 **Multiple AI Models** - Switch between Groq, Llama 4, Kimi K2, and GPT OSS
- 🔍 **Semantic Search** - Uses sentence transformers for accurate context retrieval
- 🌓 **Dark/Light Theme** - Toggle between themes with persistence
- ⚡ **Real-time Responses** - Typing indicators and smooth message animations

## 🛠️ Tech Stack

### Frontend
- React 19 with shadcn/ui components
- Tailwind CSS for styling
- Lucide React for icons
- Radix UI primitives

### Backend
- FastAPI (Python)
- MongoDB for vector storage
- Sentence Transformers for embeddings
- PyPDF for PDF text extraction

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB running locally or connection string

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API key
echo "OPENROUTER_API_KEY=your_key_here" > .env

# Run the server
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at **http://localhost:3000**

## 📁 Project Structure

```
PDF-GPT/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI routes
│   │   ├── pdf_utils.py     # PDF text extraction
│   │   ├── chunking.py      # Text chunking
│   │   ├── embeddings.py    # Sentence transformer
│   │   ├── database.py      # MongoDB connection
│   │   ├── search.py        # Vector similarity search
│   │   └── llm.py           # LLM API integration
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # shadcn components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── PdfUpload.jsx
│   │   │   ├── ModelSelector.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.js
│   │   └── lib/
│   │       └── utils.js
│   └── package.json
│
└── README.md
```

## 🤖 Available Models

| Model | Provider | Description |
|-------|----------|-------------|
| `groq/compound` | Groq | Fast inference engine |
| `meta-llama/llama-4-maverick-17b-128e-instruct` | Meta | 17B params, 128K context |
| `moonshotai/kimi-k2-instruct-0905` | Moonshot AI | Instruction-tuned |
| `openai/gpt-oss-120b` | OpenAI | 120B parameter model |

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/upload-pdf` | Upload and process PDF |
| `POST` | `/chat?question=...&model=...` | Ask a question |

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Made with ❤️ by [Anshika](https://github.com/Anshika-17)

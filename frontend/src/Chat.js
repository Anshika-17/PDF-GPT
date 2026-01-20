import React, { useState } from "react";
import "./Chat.css";

function Chat() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadPdf = async () => {
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://127.0.0.1:8000/upload-pdf", {
      method: "POST",
      body: formData,
    });

    alert("PDF uploaded successfully");
  };

  const askQuestion = async () => {
    if (!question) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    const res = await fetch(
      `http://127.0.0.1:8000/chat?question=${encodeURIComponent(question)}`,
      { method: "POST" }
    );

    const data = await res.json();

    setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="background">
      <div className="chat-card">
        <h2 className="title">📄 PDF AI Chatbot</h2>

        <div className="upload">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button onClick={uploadPdf}>Upload PDF</button>
        </div>

        <div className="chat-box">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.text}
            </div>
          ))}
          {loading && <div className="bubble bot">Thinking...</div>}
        </div>

        <div className="input-area">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something from the PDF..."
          />
          <button onClick={askQuestion}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

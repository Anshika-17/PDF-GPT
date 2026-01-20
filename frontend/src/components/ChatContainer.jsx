import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { PdfUpload } from "./PdfUpload";
import { ModelSelector, MODELS } from "./ModelSelector";
import { ThemeToggle } from "./ThemeToggle";
import { FileText, MessageSquare } from "lucide-react";

function ChatContainer() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pdfUploaded, setPdfUploaded] = useState(false);
    const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handlePdfUpload = (file) => {
        setPdfUploaded(true);
        setMessages([
            {
                role: "bot",
                text: `Great! I've processed "${file.name}". You can now ask me any questions about this PDF document.`,
            },
        ]);
    };

    const handleSendMessage = async (question) => {
        if (!question.trim()) return;

        setMessages((prev) => [...prev, { role: "user", text: question }]);
        setLoading(true);

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/chat?question=${encodeURIComponent(question)}&model=${encodeURIComponent(selectedModel)}`,
                { method: "POST" }
            );
            const data = await res.json();
            setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "Sorry, I encountered an error. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen flex-col bg-background">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                        <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-foreground">PDF GPT</h1>
                        <p className="text-xs text-muted-foreground">Chat with your documents</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <ModelSelector
                        selectedModel={selectedModel}
                        onModelChange={setSelectedModel}
                    />
                    {pdfUploaded && (
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            PDF Ready
                        </span>
                    )}

                </div>
            </header>

            {/* Chat Area */}
            <ScrollArea className="flex-1">
                <div className="flex flex-col">
                    {!pdfUploaded ? (
                        <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                                <MessageSquare className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="mb-2 text-xl font-semibold text-foreground">
                                Welcome to PDF GPT
                            </h2>
                            <p className="mb-8 max-w-md text-center text-sm text-muted-foreground">
                                Upload a PDF document to start chatting. I can help you understand,
                                summarize, and answer questions about your documents.
                            </p>
                            <div className="w-full max-w-md">
                                <PdfUpload onUpload={handlePdfUpload} />
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((m, i) => (
                                <ChatMessage
                                    key={i}
                                    message={m.text}
                                    isUser={m.role === "user"}
                                />
                            ))}
                            {loading && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>
            </ScrollArea>

            {/* Input Area */}
            {pdfUploaded && (
                <ChatInput onSend={handleSendMessage} disabled={loading} />
            )}
        </div>
    );
}

export default ChatContainer;

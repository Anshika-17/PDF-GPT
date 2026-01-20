import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Send } from "lucide-react";

function ChatInput({ onSend, disabled }) {
    const [value, setValue] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() && !disabled) {
            onSend(value.trim());
            setValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="border-t border-border bg-background p-4">
            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
                <div className="relative flex items-end gap-2 rounded-xl border border-input bg-secondary/50 p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring">
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask something about your PDF..."
                        disabled={disabled}
                        rows={1}
                        className={cn(
                            "flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            "min-h-[40px] max-h-[200px] scrollbar-thin"
                        )}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={disabled || !value.trim()}
                        className="h-9 w-9 shrink-0 rounded-lg bg-primary hover:bg-primary/90"
                    >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                    PDF GPT can make mistakes. Please verify important information.
                </p>
            </form>
        </div>
    );
}

export { ChatInput };

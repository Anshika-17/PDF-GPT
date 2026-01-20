import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "../lib/utils";
import { User, Bot } from "lucide-react";

function ChatMessage({ message, isUser }) {
    return (
        <div
            className={cn(
                "group w-full animate-fade-in",
                isUser ? "bg-transparent" : "bg-secondary/30"
            )}
        >
            <div className="mx-auto flex max-w-3xl gap-4 p-4 md:gap-6 md:px-6">
                <Avatar className={cn(
                    "h-8 w-8 shrink-0",
                    isUser ? "bg-primary" : "bg-emerald-600"
                )}>
                    <AvatarFallback className={cn(
                        isUser ? "bg-primary text-primary-foreground" : "bg-emerald-600 text-white"
                    )}>
                        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-xs font-medium text-muted-foreground">
                        {isUser ? "You" : "PDF Assistant"}
                    </span>
                    <div className="prose prose-invert prose-sm max-w-none text-foreground">
                        <p className="whitespace-pre-wrap break-words m-0 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="group w-full bg-secondary/30">
            <div className="mx-auto flex max-w-3xl gap-4 p-4 md:gap-6 md:px-6">
                <Avatar className="h-8 w-8 shrink-0 bg-emerald-600">
                    <AvatarFallback className="bg-emerald-600 text-white">
                        <Bot className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 py-3">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: "300ms" }} />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-dot" style={{ animationDelay: "600ms" }} />
                </div>
            </div>
        </div>
    );
}

export { ChatMessage, TypingIndicator };

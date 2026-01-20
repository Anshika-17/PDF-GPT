import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { ChevronDown, Check, Sparkles } from "lucide-react";

const MODELS = [
    {
        id: "groq/compound",
        name: "Groq Compound",
        description: "Fast inference engine",
        provider: "Groq"
    },
    {
        id: "meta-llama/llama-4-maverick-17b-128e-instruct",
        name: "Llama 4 Maverick",
        description: "17B parameters, 128K context",
        provider: "Meta"
    },
    {
        id: "moonshotai/kimi-k2-instruct-0905",
        name: "Kimi K2",
        description: "Instruction-tuned model",
        provider: "Moonshot AI"
    },
    {
        id: "openai/gpt-oss-120b",
        name: "GPT OSS 120B",
        description: "120B parameter model",
        provider: "OpenAI"
    },
];

function ModelSelector({ selectedModel, onModelChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const currentModel = MODELS.find(m => m.id === selectedModel) || MODELS[0];

    return (
        <div className="relative">
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-secondary/50 border-border hover:bg-secondary"
            >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{currentModel.name}</span>
                <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "rotate-180"
                )} />
            </Button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-border bg-card shadow-xl animate-fade-in">
                        <div className="p-2">
                            <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Select Model
                            </p>
                            {MODELS.map((model) => (
                                <button
                                    key={model.id}
                                    onClick={() => {
                                        onModelChange(model.id);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-secondary/50",
                                        selectedModel === model.id && "bg-secondary"
                                    )}
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-foreground">
                                                {model.name}
                                            </span>
                                            {selectedModel === model.id && (
                                                <Check className="h-4 w-4 text-primary" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {model.description}
                                        </p>
                                        <span className="text-xs text-muted-foreground/60">
                                            {model.provider}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export { ModelSelector, MODELS };

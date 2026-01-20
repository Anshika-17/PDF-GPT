import React, { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Upload, FileText, X, Check, Loader2 } from "lucide-react";

function PdfUpload({ onUpload }) {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile?.type === "application/pdf") {
            setFile(droppedFile);
            setIsUploaded(false);
        }
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsUploaded(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("http://127.0.0.1:8000/upload-pdf", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setIsUploaded(true);
                onUpload?.(file);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setIsUploaded(false);
    };

    return (
        <div className="w-full">
            {!file ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors",
                        isDragging
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-muted-foreground/50"
                    )}
                >
                    <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
                    <p className="mb-1 text-sm font-medium text-foreground">
                        Drop your PDF here
                    </p>
                    <p className="mb-3 text-xs text-muted-foreground">or click to browse</p>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 cursor-pointer opacity-0"
                    />
                </div>
            ) : (
                <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                        <FileText className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                            {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                    {isUploaded ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                            <Check className="h-4 w-4 text-emerald-500" />
                        </div>
                    ) : (
                        <>
                            <Button
                                size="sm"
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="shrink-0"
                            >
                                {isUploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Upload"
                                )}
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={clearFile}
                                className="h-8 w-8 shrink-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export { PdfUpload };

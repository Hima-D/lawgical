import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        const { title, content, topics, isAnonymized, sensitivityLevel } = await req.json();

        // Mock AI Redaction logic
        // In a real app, we would send 'content' to an LLM or NLP service here.
        const redactedContent = simulateRedaction(content);

        const story = await prisma.story.create({
            data: {
                title,
                originalContent: content,
                redactedContent,
                topics,
                isAnonymized,
                sensitivityLevel,
                status: "PENDING"
            }
        });

        return NextResponse.json({ success: true, storyId: story.id }, { status: 201 });
    } catch (error) {
        console.error("Story submission error:", error);
        return NextResponse.json({ error: "Failed to submit story" }, { status: 500 });
    }
}

function simulateRedaction(text) {
    // Simple regex-based redaction for demonstration
    // Redact capitalized words (likely names) and numbers (likely phones)
    return text
        .replace(/[A-Z][a-z]+/g, "[NAME]")
        .replace(/\d{10}/g, "[PHONE]")
        .replace(/[A-Z]{5,}/g, "[PLACE]");
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        const stories = await prisma.story.findMany({
            where: status ? { status } : {},
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(stories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const { id, redactedContent, status, sensitivityLevel } = await req.json();

        const story = await prisma.story.update({
            where: { id: parseInt(id) },
            data: { redactedContent, status, sensitivityLevel }
        });

        return NextResponse.json(story);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update story" }, { status: 500 });
    }
}

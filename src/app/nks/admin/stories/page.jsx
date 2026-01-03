"use client";

import { useState, useEffect } from "react";
import { prisma } from "@/lib/prisma";
import Header from "@/components/header";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Search,
    Filter,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Eye,
    Edit,
    Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminStoriesPage() {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        const res = await fetch("/api/stories?status=PENDING");
        const data = await res.json();
        setStories(data);
        setIsLoading(false);
    };

    const handleApprove = async () => {
        if (!selectedStory) return;
        const res = await fetch("/api/stories", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: selectedStory.id,
                status: "APPROVED",
                redactedContent: selectedStory.redactedContent
            })
        });
        if (res.ok) {
            setSelectedStory(null);
            fetchStories();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header />

            <main className="pt-24 pb-8 px-6 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Story Curation</h1>
                        <p className="text-slate-500">Review and redact victim stories for public advocacy.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                className="pl-10 pr-4 h-10 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
                                placeholder="Search stories..."
                            />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-250px)]">

                    {/* List View */}
                    <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                        <div className="overflow-y-auto flex-1">
                            <Table>
                                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Topics</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stories.map(story => (
                                        <TableRow
                                            key={story.id}
                                            className={`cursor-pointer transition-colors ${selectedStory?.id === story.id ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                                            onClick={() => setSelectedStory(story)}
                                        >
                                            <TableCell className="font-medium max-w-[200px] truncate">{story.title}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 flex-wrap">
                                                    {story.topics.slice(0, 2).map(t => (
                                                        <Badge key={t} variant="secondary" className="text-[10px] px-1.5 py-0">{t}</Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-500 text-xs">
                                                {new Date(story.createdAt).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {stories.length === 0 && !isLoading && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-12 text-slate-400">
                                                No pending stories found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Editor View */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                        <AnimatePresence mode="wait">
                            {selectedStory ? (
                                <motion.div
                                    key={selectedStory.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-bold">{selectedStory.title}</h2>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge>{selectedStory.sensitivityLevel}</Badge>
                                                <span className="text-xs text-slate-400">ID: {selectedStory.id}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Shield className="w-4 h-4" /> AI Redact
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => setSelectedStory(null)}>Close</Button>
                                        </div>
                                    </div>

                                    <div className="flex-1 grid grid-rows-2 overflow-hidden">
                                        {/* Original Content */}
                                        <div className="p-6 overflow-y-auto border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Original Story (Confidential)</label>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                                {selectedStory.originalContent}
                                            </p>
                                        </div>

                                        {/* Redaction Editor */}
                                        <div className="p-6 flex flex-col border-none">
                                            <label className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-2 block">Redacted Version (Public)</label>
                                            <Textarea
                                                className="flex-1 resize-none bg-white dark:bg-slate-900 border-none focus-visible:ring-0 p-0 text-lg leading-relaxed"
                                                value={selectedStory.redactedContent || ""}
                                                onChange={(e) => setSelectedStory({ ...selectedStory, redactedContent: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                        <p className="text-xs text-slate-400">Editing as <strong>Admin</strong></p>
                                        <div className="flex gap-3">
                                            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                <XCircle className="w-4 h-4 mr-2" /> Reject
                                            </Button>
                                            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700 text-white">
                                                <CheckCircle className="w-4 h-4 mr-2" /> Approve & Publish
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                        <Eye className="w-8 h-8 opacity-20" />
                                    </div>
                                    <p>Select a story to begin curation</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </main>
        </div>
    );
}

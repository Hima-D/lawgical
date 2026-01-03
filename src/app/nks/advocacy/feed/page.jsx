"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Search,
    Share2,
    Bookmark,
    Volume2,
    Newspaper
} from "lucide-react";

const filterOptions = ["All Stories", "Child Marriage", "Same-Sex Rights", "Gender Inclusion", "Legal Aid"];

export default function PublicStoryFeed() {
    const [activeFilter, setActiveFilter] = useState("All Stories");
    const [stories, setStories] = useState([]);

    useEffect(() => {
        // Mock data for public feed
        setStories([
            {
                id: 1,
                title: "Equality in Law: The Article 32 Journey",
                excerpt: "How a anonymous victim from Rural Haryana challenged traditional norms to seek legal protection under Article 32.",
                topic: "Legal Aid",
                date: "Jan 12, 2026",
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 2,
                title: "Voices from the Third Gender",
                excerpt: "A collection of stories highlighting the challenges and triumphs of same-sex couples seeking legal recognition.",
                topic: "Gender Inclusion",
                date: "Jan 10, 2026",
                image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 3,
                title: "Breaking the Chains: Child Marriage Prevention",
                excerpt: "A story of hope: How NKS Samiti's legal intervention stopped a forced marriage in West Bengal.",
                topic: "Child Marriage",
                date: "Jan 05, 2026",
                image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80"
            },
            {
                id: 4,
                title: "Same-Sex Rights: A Legal Perspective",
                excerpt: "Analysis of recent court rulings and how they impact the lives of LGBTQ+ individuals in South India.",
                topic: "Same-Sex Rights",
                date: "Dec 28, 2025",
                image: "https://images.unsplash.com/photo-1501250987900-211872507e18?auto=format&fit=crop&w=800&q=80"
            }
        ]);
    }, []);

    const filteredStories = activeFilter === "All Stories"
        ? stories
        : stories.filter(s => s.topic === activeFilter);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Header />

            <main className="pt-32 pb-20">
                {/* Hero Area */}
                <section className="px-6 max-w-7xl mx-auto mb-16 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
                        <div className="max-w-2xl">
                            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-none">Voices for Change</Badge>
                            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight">Nyaya Kavach <span className="text-blue-600">Insights</span></h1>
                            <p className="text-xl text-slate-500 mt-4 leading-relaxed">
                                Exploring the human stories behind litigation. From child marriage prevention to LGBTQ+ rights, we amplify the voices that matter.
                            </p>
                        </div>
                        <div className="hidden lg:flex gap-4">
                            <Button variant="outline" className="gap-2 rounded-full">
                                <Volume2 className="w-4 h-4" /> Listen to Podcast
                            </Button>
                            <Button variant="outline" className="gap-2 rounded-full">
                                <Newspaper className="w-4 h-4" /> Media Toolkit
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Search & Filter */}
                <section className="px-6 max-w-7xl mx-auto mb-10 overflow-x-auto no-scrollbar py-2">
                    <div className="flex gap-4 items-center min-w-max">
                        {filterOptions.map(option => (
                            <Button
                                key={option}
                                variant={activeFilter === option ? "default" : "ghost"}
                                onClick={() => setActiveFilter(option)}
                                className={`rounded-full px-6 whitespace-nowrap ${activeFilter === option ? "bg-blue-600 text-white" : "text-slate-500"}`}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </section>

                {/* Stories Grid */}
                <section className="px-6 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredStories.map((story, index) => (
                                <motion.div
                                    key={story.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <div className="flex flex-col lg:flex-row h-full">
                                            <div className="w-full lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                                                <img
                                                    src={story.image}
                                                    alt={story.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                                                <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 border-none backdrop-blur-md">
                                                    {story.topic}
                                                </Badge>
                                            </div>
                                            <div className="p-8 lg:p-10 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">{story.date}</p>
                                                    <h2 className="text-2xl font-bold leading-tight group-hover:text-blue-600 transition-colors">{story.title}</h2>
                                                    <p className="text-slate-500 mt-4 leading-relaxed line-clamp-3">
                                                        {story.excerpt}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                                                    <Button variant="ghost" className="p-0 font-bold text-slate-900 dark:text-white flex items-center gap-2 hover:bg-transparent hover:text-blue-600">
                                                        Read Full Story <ArrowRight className="w-4 h-4" />
                                                    </Button>
                                                    <div className="flex gap-2">
                                                        <Button size="icon" variant="ghost" className="rounded-full hover:bg-white">
                                                            <Bookmark className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="rounded-full hover:bg-white">
                                                            <Share2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Newsletter / CTA */}
                <section className="mt-20 px-6 max-w-7xl mx-auto">
                    <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200 dark:shadow-none">
                        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-[80px]" />

                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                            <h2 className="text-3xl lg:text-5xl font-bold text-white">Join the Advocacy</h2>
                            <p className="text-blue-100 text-lg">Receive weekly updates on litigation progress, new podcasts, and success stories from the field.</p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <input
                                    placeholder="Enter your email"
                                    className="flex-1 h-14 rounded-full px-8 bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-md"
                                />
                                <Button className="h-14 rounded-full px-8 bg-white text-blue-600 font-bold hover:bg-blue-50">
                                    Subscribe Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

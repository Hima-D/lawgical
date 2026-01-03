"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Heart,
    Target,
    MapPin,
    TrendingUp,
    ExternalLink,
    ShieldCheck
} from "lucide-react";

export default function DonorDashboard() {
    const [projects, setProjects] = useState([
        { id: 1, name: "Article 32 Relief Fund", description: "Supporting legal costs for child marriage victims.", raised: 450000, target: 1000000, category: "LEGAL_AID" },
        { id: 2, name: "Sanctuary Net", description: "Emergency housing for same-sex couples in distress.", raised: 820000, target: 500000, category: "SURVIVOR_SUPPORT" },
        { id: 3, name: "Gender Equality Roadshow", description: "Mobile legal awareness units across rural India.", raised: 120000, target: 1500000, category: "ADVOCACY" },
    ]);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Header />

            {/* Hero Impact Stats */}
            <section className="pt-32 pb-16 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4">
                            <Badge className="bg-blue-600 text-white border-none">Your Total Impact</Badge>
                            <h1 className="text-5xl lg:text-7xl font-bold">₹12.4L+</h1>
                            <p className="text-slate-400 text-lg max-w-md">Your contributions have directly supported 40+ litigation cases and provided sanctuary to 15 families.</p>
                        </div>
                        <div className="flex gap-4">
                            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">Make New Gift</Button>
                            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">Tax Receipt (80G)</Button>
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Active Projects */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Active Mission Funds</h2>
                            <Button variant="link" className="text-blue-600 gap-1">View all <ExternalLink className="w-4 h-4" /></Button>
                        </div>

                        <div className="grid gap-6">
                            {projects.map(project => (
                                <Card key={project.id} className="p-0 overflow-hidden border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-full md:w-48 h-48 md:h-auto bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                            {project.category === "LEGAL_AID" ? <ShieldCheck className="w-12 h-12 text-blue-500" /> : <Heart className="w-12 h-12 text-pink-500" />}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold">{project.name}</h3>
                                                    <Badge variant="secondary">{project.category}</Badge>
                                                </div>
                                                <p className="text-sm text-slate-500 mb-6">{project.description}</p>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm font-medium">
                                                    <span>₹{(project.raised / 100000).toFixed(1)}L Raised</span>
                                                    <span className="text-slate-400">Target: ₹{(project.target / 100000).toFixed(1)}L</span>
                                                </div>
                                                <Progress value={(project.raised / project.target) * 100} className="h-2 bg-slate-100" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Impact Stories Sidebar */}
                    <div className="space-y-8">
                        <Card className="p-6 border-none bg-blue-50 dark:bg-blue-900/10">
                            <h2 className="font-bold flex items-center gap-2 mb-4 text-blue-800 dark:text-blue-300">
                                <TrendingUp className="w-5 h-5" /> Live Transparency
                            </h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-1 h-12 bg-blue-600 rounded-full" />
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold">Latest Grant</p>
                                        <p className="font-medium">₹50,000 to Bangalore Advocate Cluster</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1 h-12 bg-green-600 rounded-full" />
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold">Milestone Reached</p>
                                        <p className="font-medium">Same-Sex Marriage WRIT-102 Filed</p>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700">Download Audit Report</Button>
                        </Card>

                        <Card className="p-6">
                            <h2 className="font-bold mb-4">Upcoming Campaigns</h2>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <p className="text-xs font-bold text-pink-500 mb-1">MARCH 2026</p>
                                    <p className="font-bold text-sm">International Women's Month CSR Drive</p>
                                    <Button variant="link" className="p-0 h-auto text-xs mt-2 text-slate-400">See Campaign Details</Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    );
}

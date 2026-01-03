"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CaseTracker from "@/components/nks/CaseTracker";
import {
    Users,
    Gavel,
    FileText,
    TrendingUp,
    Plus
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const mockStats = [
    { name: "Mon", cases: 4 },
    { name: "Tue", cases: 7 },
    { name: "Wed", cases: 5 },
    { name: "Thu", cases: 9 },
    { name: "Fri", cases: 12 },
];

export default function AdvocateDashboard() {
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock data for now
        setCases([
            { id: 1, title: "Same-Sex Marriage Equality", description: "Public interest litigation for legal recognition.", status: "HEARING", updatedAt: new Date(), writType: "Art. 32" },
            { id: 2, title: "Child Marriage Prevention - Rural Area", description: "Injunction against community event.", status: "FILED", updatedAt: new Date(), writType: "Art. 32" },
            { id: 3, title: "Unnatural Sex Victim - Case #402", description: "Legal aid for victim compensation.", status: "DRAFTING", updatedAt: new Date(), writType: "Art. 226" },
        ]);
        setIsLoading(false);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header />

            <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">Litigation Dashboard</h1>
                        <p className="text-slate-500">Manage your active cases and legal drafting.</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                        <Plus className="w-4 h-4" /> New Case
                    </Button>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard title="Active Cases" value="24" change="+4 this week" icon={Gavel} />
                    <StatCard title="Pending Writs" value="8" change="-2 this week" icon={FileText} iconColor="text-amber-500" />
                    <StatCard title="Total Victims" value="156" change="+12 this month" icon={Users} iconColor="text-purple-500" />
                    <StatCard title="Resolution Rate" value="92%" change="+5%" icon={TrendingUp} iconColor="text-green-500" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Case List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold mb-6">Recent Case Activity</h2>
                        <CaseTracker cases={cases} />
                    </div>

                    {/* Activity Chart */}
                    <div className="space-y-8">
                        <Card className="p-6">
                            <h2 className="text-lg font-bold mb-4">Weekly Engagement</h2>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mockStats}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                        <YAxis hide />
                                        <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                            <h2 className="text-lg font-bold mb-2">Lawgical.tech Integration</h2>
                            <p className="text-slate-400 text-xs mb-4">Generate certified legal documents using the Article 32 template.</p>
                            <Button variant="outline" className="w-full text-white border-slate-700 hover:bg-slate-700">
                                Open Template Builder
                            </Button>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, change, icon: Icon, iconColor = "text-blue-500" }) {
    return (
        <Card className="p-6 border-none shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${iconColor}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="text-[10px] font-bold border-green-200 text-green-700 bg-green-50">
                    {change}
                </Badge>
            </div>
            <div className="mt-4">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{title}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
            </div>
        </Card>
    );
}

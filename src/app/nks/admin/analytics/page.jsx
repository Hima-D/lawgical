"use client";

import { useState } from "react";
import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    Map as MapIcon,
    Users,
    AlertCircle,
    BarChart3,
    PieChart as PieIcon
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from "recharts";

const performanceData = [
    { name: "Oct", cases: 20, stories: 45 },
    { name: "Nov", cases: 35, stories: 60 },
    { name: "Dec", cases: 25, stories: 85 },
    { name: "Jan", cases: 50, stories: 120 },
];

const issueDistribution = [
    { name: "Child Marriage", value: 35, color: "#3b82f6" },
    { name: "LGBTQ+ Rights", value: 25, color: "#a855f7" },
    { name: "Sexual Crimes", value: 30, color: "#ec4899" },
    { name: "Others", value: 10, color: "#94a3b8" },
];

export default function AnalyticsDashboard() {
    const [activeGeo, setActiveGeo] = useState("Delhi-NCR");

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header />

            <main className="pt-24 pb-20 px-6 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-bold">Impact Analytics</h1>
                        <p className="text-slate-500">Real-time data on case resolutions and story engagement.</p>
                    </div>
                    <div className="flex gap-2">
                        <Badge className="px-4 py-2 bg-white text-slate-900 border border-slate-200">Export PDF Report</Badge>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-8 bg-blue-600 text-white border-none rounded-[2rem] shadow-xl shadow-blue-200 dark:shadow-none">
                        <p className="text-xs font-bold uppercase tracking-widest text-blue-100">Conversion Rate</p>
                        <h3 className="text-4xl font-bold mt-2">12.5%</h3>
                        <p className="text-sm text-blue-200 mt-2 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" /> Story-to-Litigation conversion
                        </p>
                    </Card>

                    <MetricCard title="Active Volunteers" value="542" change="+12%" icon={Users} />
                    <MetricCard title="Stories Published" value="1,204" change="+24%" icon={BarChart3} />
                    <MetricCard title="Case Resolution" value="89%" change="+2%" icon={AlertCircle} />
                </div>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Heatmap Placeholder */}
                    <Card className="lg:col-span-8 p-10 rounded-[3rem] border-none shadow-sm relative overflow-hidden h-[600px] bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-bold">Geospatial Issue Hotspots</h2>
                                <p className="text-slate-400">Concentration of cases by geographic region.</p>
                            </div>
                            <select className="bg-slate-50 border-none rounded-full px-4 py-2 text-sm font-bold">
                                <option>Delhi-NCR</option>
                                <option>Maharashtra</option>
                                <option>South India</option>
                            </select>
                        </div>

                        {/* Stylized Heatmap Representation */}
                        <div className="relative w-full h-[400px] bg-blue-50/50 dark:bg-slate-800/50 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-blue-100">
                            <MapIcon className="w-20 h-20 text-blue-100 dark:text-slate-700" />

                            {/* Animated Hotspots */}
                            <Hotspot x="30%" y="20%" size="40px" pulse color="bg-blue-500" label="12 Cases - Child Marriage" />
                            <Hotspot x="60%" y="45%" size="60px" pulse color="bg-pink-500" label="45 Cases - Sexual Crimes" />
                            <Hotspot x="45%" y="70%" size="30px" pulse color="bg-purple-500" label="8 Cases - LGBTQ+" />
                        </div>
                    </Card>

                    {/* Issue Distribution */}
                    <Card className="lg:col-span-4 p-8 rounded-[3rem] border-none shadow-sm bg-white dark:bg-slate-900">
                        <h2 className="text-xl font-bold mb-6">Issue Category Mix</h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={issueDistribution}
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {issueDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4 mt-6">
                            {issueDistribution.map(item => (
                                <div key={item.name} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="font-bold text-sm">{item.name}</span>
                                    </div>
                                    <span className="text-slate-400 text-sm font-bold">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Trend Chart */}
                    <Card className="lg:col-span-12 p-10 rounded-[3rem] border-none shadow-sm bg-white dark:bg-slate-900">
                        <h2 className="text-2xl font-bold mb-8">Quarterly Engagement Trend</h2>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorStories" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Area type="monotone" dataKey="cases" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCases)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="stories" stroke="#a855f7" fillOpacity={1} fill="url(#colorStories)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}

function MetricCard({ title, value, change, icon: Icon }) {
    return (
        <Card className="p-8 rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
            <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <Icon className="w-6 h-6 text-slate-900 dark:text-white" />
                </div>
                <Badge variant="outline" className="text-green-600 border-green-100 bg-green-50 font-bold">{change}</Badge>
            </div>
            <div className="mt-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
                <h3 className="text-3xl font-extrabold mt-1">{value}</h3>
            </div>
        </Card>
    );
}

function Hotspot({ x, y, size, color, label }) {
    return (
        <div
            className="absolute group cursor-help"
            style={{ left: x, top: y }}
        >
            <div
                className={`rounded-full ${color} opacity-40 animate-ping absolute inset-0`}
                style={{ width: size, height: size }}
            />
            <div
                className={`rounded-full ${color} shadow-lg relative`}
                style={{ width: size, height: size }}
            />

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
            </div>
        </div>
    );
}

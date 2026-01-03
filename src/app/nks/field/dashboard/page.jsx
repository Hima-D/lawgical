"use client";

import { useState, useEffect } from "react";
import {
    ShieldAlert,
    MapPin,
    Camera,
    Wifi,
    WifiOff,
    CloudUpload,
    FileCheck,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function FieldWorkerDashboard() {
    const [isOnline, setIsOnline] = useState(true);
    const [isPanicActive, setIsPanicActive] = useState(false);
    const [offlineQueue, setOfflineQueue] = useState(0);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const triggerPanic = () => {
        setIsPanicActive(true);
        // In a real app, this would send a high-priority alert to the HQ with Geo-coordinates
        setTimeout(() => setIsPanicActive(false), 5000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-10">
            {/* Mobile Sticky Header */}
            <header className="fixed top-0 inset-x-0 bg-white dark:bg-slate-900 border-b p-4 z-50 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Zap className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold tracking-tight">NKS Field</span>
                </div>
                <div className="flex items-center gap-2">
                    {isOnline ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none flex gap-1 items-center px-3 py-1">
                            <Wifi className="w-3 h-3" /> Online
                        </Badge>
                    ) : (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none flex gap-1 items-center px-3 py-1">
                            <WifiOff className="w-3 h-3" /> Offline
                        </Badge>
                    )}
                </div>
            </header>

            <main className="pt-20 px-4 space-y-6">

                {/* Panic Button Area */}
                <Card className="p-8 rounded-[2.5rem] bg-gradient-to-br from-red-600 to-red-800 text-white border-none shadow-2xl shadow-red-200 dark:shadow-none text-center overflow-hidden relative">
                    <div className="relative z-10 space-y-4">
                        <ShieldAlert className="w-16 h-16 mx-auto opacity-80" />
                        <h2 className="text-2xl font-bold">Emergency Portal</h2>
                        <p className="text-red-100 text-sm opacity-80">Immediate legal and police coordination for field rescue.</p>
                        <Button
                            onClick={triggerPanic}
                            disabled={isPanicActive}
                            className={`w-full h-20 rounded-3xl text-xl font-extrabold uppercase tracking-widest transition-all ${isPanicActive ? "bg-white text-red-600" : "bg-red-500 hover:bg-red-400 text-white border-4 border-white/20"
                                }`}
                        >
                            {isPanicActive ? "Alert Sent To HQ" : "Panic Button"}
                        </Button>
                    </div>

                    <AnimatePresence>
                        {isPanicActive && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 2 }}
                                className="absolute inset-x-0 bottom-0 top-0 bg-white/20 rounded-full blur-[100px]"
                            />
                        )}
                    </AnimatePresence>
                </Card>

                {/* Status Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-6 rounded-[2rem] border-none bg-white dark:bg-slate-900 shadow-sm">
                        <CloudUpload className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Offline Queue</p>
                        <h3 className="text-2xl font-bold">{offlineQueue} items</h3>
                    </Card>
                    <Card className="p-6 rounded-[2rem] border-none bg-white dark:bg-slate-900 shadow-sm">
                        <FileCheck className="w-6 h-6 text-green-600 mb-2" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Synced Cases</p>
                        <h3 className="text-2xl font-bold">12</h3>
                    </Card>
                </div>

                {/* Evidence Upload Section */}
                <Card className="p-8 rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-blue-600" /> Evidence Logger
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            className="aspect-square rounded-3xl bg-slate-50 dark:bg-slate-800 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors"
                            onClick={() => setOfflineQueue(q => q + 1)}
                        >
                            <Camera className="w-8 h-8 text-slate-400" />
                            <span className="text-xs font-bold text-slate-500">Photo/Video</span>
                        </button>
                        <button className="aspect-square rounded-3xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center gap-2 border-none text-slate-400">
                            <MapPin className="w-8 h-8" />
                            <span className="text-xs font-bold">Auto Geo-tag</span>
                        </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                            <CloudUpload className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-900 dark:text-blue-300">Smart-Sync Active</p>
                            <p className="text-[10px] text-blue-700 dark:text-blue-400 opacity-80">Files will automatically upload when network is stable.</p>
                        </div>
                    </div>
                </Card>

                {/* Active Assignments */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Assigned Rescue Missions</h3>
                    <Card className="p-6 rounded-[2rem] border-none shadow-sm relative overflow-hidden bg-white dark:bg-slate-900">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold">Case #402: Child Marriage Prevention</h4>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> Village Saharanpur - Sector 4
                                </p>
                            </div>
                            <Badge className="bg-amber-100 text-amber-700 border-none font-bold">Priority High</Badge>
                        </div>
                        <Button className="w-full mt-6 rounded-2xl bg-blue-600 h-12 font-bold">
                            Open Mission Details
                        </Button>
                    </Card>
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t flex justify-around p-4 rounded-t-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <NavItem icon={Zap} label="Tasks" active />
                <NavItem icon={Camera} label="Logger" />
                <NavItem icon={MapPin} label="Maps" />
                <NavItem icon={ShieldAlert} label="HQ" />
            </nav>
        </div>
    );
}

function NavItem({ icon: Icon, label, active = false }) {
    return (
        <div className={`flex flex-col items-center gap-1 ${active ? "text-blue-600 font-bold" : "text-slate-400"}`}>
            <Icon className="w-6 h-6" />
            <span className="text-[10px] uppercase tracking-tighter">{label}</span>
        </div>
    );
}

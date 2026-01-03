"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ShieldCheck,
    Heart,
    Users,
    Gavel,
    Zap,
    TrendingUp,
    ArrowRight,
    Globe,
    MessageCircle
} from "lucide-react";

export default function NKSPortalLanding() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Header />

            <main>
                {/* Animated Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-blue-400 font-bold text-sm backdrop-blur-md">
                                    <Globe className="w-4 h-4" /> Global Mission, Local Action
                                </div>
                                <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9]">
                                    Justice <br />
                                    <span className="text-blue-500">Accelerated.</span>
                                </h1>
                                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                                    Unified litigation, advocacy, and social impact platform for Nyaya Kavach Samiti. Bridging the gap between human rights violations and legal remedies.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Link href="/stories/submit">
                                        <Button size="lg" className="h-16 px-10 rounded-3xl bg-blue-600 hover:bg-blue-700 text-lg font-bold">
                                            Share Your Story
                                        </Button>
                                    </Link>
                                    <Link href="/nks/volunteers/join">
                                        <Button size="lg" variant="outline" className="h-16 px-10 rounded-3xl border-slate-700 text-lg font-bold hover:bg-slate-800">
                                            Join as Volunteer
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <div className="relative z-10 p-2 bg-gradient-to-br from-slate-700 to-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-700/50">
                                    <img
                                        src="https://images.unsplash.com/photo-1541462608141-ad60397d41a2?auto=format&fit=crop&w=1200&q=80"
                                        alt="Legal Justice"
                                        className="rounded-[2.5rem] w-full h-[500px] object-cover mix-blend-overlay opacity-60"
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
                                        <p className="text-5xl font-extrabold text-white mb-4">402</p>
                                        <p className="text-sm font-bold uppercase tracking-widest text-blue-400">Cases Resolved this Quarter</p>
                                    </div>
                                </div>
                                {/* Floatings Stat card */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="absolute -bottom-10 -left-10 p-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 hidden lg:block"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-xl">
                                            <TrendingUp className="text-green-600 w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Impact Transparency</p>
                                            <p className="text-lg font-extrabold">₹1.2Cr+ Distributed</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Access the Portals */}
                <section className="py-32 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-extrabold italic">Unified <span className="text-blue-600">Access Control.</span></h2>
                        <p className="text-slate-500 text-lg">Select your portal to proceed based on your role in the mission.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PortalCard
                            title="Advocate Portal"
                            desc="Manage your litigation workload, track writs, and collaborate with field workers."
                            icon={Gavel}
                            link="/nks/advocate/dashboard"
                            color="blue"
                        />
                        <PortalCard
                            title="Donor Hub"
                            desc="Track every rupee. Visualize your impact through project-specific CSR dashbaords."
                            icon={Heart}
                            link="/nks/donors/dashboard"
                            color="pink"
                        />
                        <PortalCard
                            title="Admin Center"
                            desc="Curate sensitive stories, manage regional volunteers, and see global analytics."
                            icon={ShieldCheck}
                            link="/nks/admin/stories"
                            color="slate"
                        />
                        <PortalCard
                            title="Field Operations"
                            desc="Offline-first toolkit for field workers. Rescue logging and emergency alerts."
                            icon={Zap}
                            link="/nks/field/dashboard"
                            color="amber"
                        />
                        <PortalCard
                            title="Advocacy Feed"
                            desc="Public insights, news channel pitches, and victim stories curated for change."
                            icon={Globe}
                            link="/nks/advocacy/feed"
                            color="purple"
                        />
                        <PortalCard
                            title="Support Center"
                            desc="Secure chat and legal guidance for victims and same-sex couples in distress."
                            icon={MessageCircle}
                            link="/contact"
                            color="teal"
                        />
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="bg-slate-50 dark:bg-slate-900/50 py-32 px-6 rounded-[4rem] mx-4 mb-20">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <ShieldCheck className="w-16 h-16 text-blue-600 mx-auto" />
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Our Commitment to Privacy</h2>
                        <p className="text-xl text-slate-500 leading-relaxed italic">
                            "We believe that the story of a victim is their most powerful weapon for change. Our platform ensures that while the voice is loud, the identity is safe—guarded by bank-level encryption and ethical AI redaction."
                        </p>
                        <div className="pt-6">
                            <p className="font-bold text-slate-900 dark:text-white">Nyaya Kavach Samiti Secretariat</p>
                            <p className="text-sm text-slate-500 mt-1">Delhi-NCR, India</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function PortalCard({ title, desc, icon: Icon, link, color }) {
    const colors = {
        blue: "bg-blue-600 shadow-blue-200",
        pink: "bg-pink-600 shadow-pink-200",
        slate: "bg-slate-800 shadow-slate-200",
        amber: "bg-amber-600 shadow-amber-200",
        purple: "bg-purple-600 shadow-purple-200",
        teal: "bg-teal-600 shadow-teal-200",
    };

    return (
        <Link href={link}>
            <Card className="group h-full p-10 rounded-[3rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-900 flex flex-col justify-between">
                <div className="space-y-6">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl ${colors[color]}`}>
                        <Icon className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">{title}</h3>
                        <p className="text-slate-500 mt-4 leading-relaxed font-medium">
                            {desc}
                        </p>
                    </div>
                </div>
                <div className="pt-8 flex items-center gap-2 font-extrabold text-blue-600 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Open Portal <ArrowRight className="w-4 h-4" />
                </div>
            </Card>
        </Link>
    );
}

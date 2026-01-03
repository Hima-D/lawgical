"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import VolunteerOnboardingForm from "@/components/nks/VolunteerOnboardingForm";
import { motion } from "framer-motion";
import { Sparkles, Shield, Target } from "lucide-react";

export default function VolunteerJoinPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">

                    {/* Left: Mission & Incentives */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 space-y-10"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-blue-600 font-bold text-sm">
                            <Sparkles className="w-4 h-4" />
                            Join the 500+ NKS Volunteers
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                            Your Talent. <br />
                            <span className="text-blue-600">Their Justice.</span>
                        </h1>

                        <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                            From law students to software engineers, every skill contributes to human rights advocacy. Help us curate stories, track cases, and build a safer digital India.
                        </p>

                        <div className="grid gap-6 max-w-md">
                            <div className="flex gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                                    <Shield className="text-blue-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Legal Exposure</h3>
                                    <p className="text-sm text-slate-500 mt-1">Work directly with advocates on Article 32 writ petitions and litigation strategy.</p>
                                </div>
                            </div>

                            <div className="flex gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0">
                                    <Target className="text-purple-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Human Impact</h3>
                                    <p className="text-sm text-slate-500 mt-1">Directly help victims of child marriage and unnatural sex crimes find their voice.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Onboarding Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 w-full"
                    >
                        <VolunteerOnboardingForm />
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

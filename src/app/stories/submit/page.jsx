"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import StorySubmissionForm from "@/components/nks/StorySubmissionForm";
import { ShieldCheck, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function StorySubmitPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Context & Support */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                            <ShieldCheck className="w-4 h-4" />
                            Secure & Anonymous Platform
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                            Share Your Story. <br />
                            <span className="text-blue-600">Change the System.</span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Nyaya Kavach Samiti is here to listen. Whether it's about child marriage, LGBTQ+ rights, or unnatural sex victim support, your experience helps us build a stronger case for legal reform.
                        </p>

                        <div className="grid gap-6">
                            <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                    <MessageCircle className="text-purple-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Safe Space</h3>
                                    <p className="text-sm text-slate-500">Your data is encrypted and only used for your chosen advocacy level.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center shrink-0">
                                    <Heart className="text-pink-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Direct Support</h3>
                                    <p className="text-sm text-slate-500">Opt-in to be contacted by our legal team for Article 32 writ assistance.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <StorySubmissionForm />
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
}

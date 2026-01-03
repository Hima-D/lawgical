"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    MapPin,
    Clock,
    Code,
    Gavel,
    PenTool,
    Camera,
    CheckCircle,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const skills = [
    { id: "legal", label: "Legal Support", icon: Gavel, color: "bg-blue-100 text-blue-700" },
    { id: "content", label: "Content Creation", icon: PenTool, color: "bg-purple-100 text-purple-700" },
    { id: "tech", label: "Tech & Data", icon: Code, color: "bg-teal-100 text-teal-700" },
    { id: "media", label: "Media/Photography", icon: Camera, color: "bg-pink-100 text-pink-700" },
];

export default function VolunteerOnboardingForm() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        skills: [],
        location: "",
        availability: "Part-time",
        reason: ""
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const toggleSkill = (skillId) => {
        const newSkills = data.skills.includes(skillId)
            ? data.skills.filter(s => s !== skillId)
            : [...data.skills, skillId];
        setData({ ...data, skills: newSkills });
    };

    const handleSubmit = async () => {
        // Simulate API call to save VolunteerProfile
        setIsSuccess(true);
    };

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800">
            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="space-y-8"
                    >
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Heart className="text-red-600 w-8 h-8" />
                                    </div>
                                    <h2 className="text-3xl font-bold">What are your skills?</h2>
                                    <p className="text-slate-500 mt-2">Select areas where you can best contribute to the NKS mission.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {skills.map(skill => (
                                        <div
                                            key={skill.id}
                                            onClick={() => toggleSkill(skill.id)}
                                            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${data.skills.includes(skill.id)
                                                    ? "border-blue-600 bg-blue-50/50"
                                                    : "border-slate-100 dark:border-slate-800 hover:border-blue-200"
                                                }`}
                                        >
                                            <skill.icon className={`w-8 h-8 ${data.skills.includes(skill.id) ? "text-blue-600" : "text-slate-400"}`} />
                                            <span className="font-bold text-sm tracking-tight">{skill.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold">Logistics & Availability</h2>
                                    <p className="text-slate-500 mt-2">Where are you located and how much time can you commit?</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Current City</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <Input
                                                placeholder="e.g. New Delhi"
                                                className="pl-12 h-14 rounded-2xl bg-slate-50 border-none"
                                                value={data.location}
                                                onChange={(e) => setData({ ...data, location: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Weekly Availability</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {["Few Hours", "Part-time", "Full-time"].map(v => (
                                                <Button
                                                    key={v}
                                                    variant={data.availability === v ? "default" : "outline"}
                                                    className="rounded-xl h-12"
                                                    onClick={() => setData({ ...data, availability: v })}
                                                >
                                                    {v}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between pt-8 border-t border-slate-100 dark:border-slate-800">
                            {step > 1 ? (
                                <Button variant="ghost" className="rounded-full" onClick={() => setStep(step - 1)}>
                                    <ChevronLeft className="mr-2 w-4 h-4" /> Go Back
                                </Button>
                            ) : <div />}

                            {step < 2 ? (
                                <Button className="bg-blue-600 rounded-full px-8" onClick={() => setStep(step + 1)}>
                                    Continue <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            ) : (
                                <Button className="bg-blue-600 rounded-full px-10 shadow-lg shadow-blue-100" onClick={handleSubmit}>
                                    Setup My Profile
                                </Button>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-6 space-y-6"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="text-green-600 w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-bold">Welcome Aboard!</h2>
                        <p className="text-slate-500 max-w-sm mx-auto">Your profile is being matched with pending litigation tasks and advocacy campaigns.</p>
                        <Button className="bg-slate-900 text-white rounded-full px-8 h-12" onClick={() => window.location.reload()}>
                            Go to Volunteer Hub
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

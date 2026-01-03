"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Send,
    AlertTriangle,
    CheckCircle2,
    Eye,
    EyeOff,
    ChevronRight,
    ChevronLeft,
    FileText,
    UserSecret
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const steps = [
    { id: 1, title: "Title & Topic", icon: FileText },
    { id: 2, title: "Your Story", icon: Edit3 },
    { id: 3, title: "Privacy & Review", icon: ShieldCheck },
];

export default function StorySubmissionForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        topics: [],
        isAnonymized: true,
        sensitivityLevel: "NORMAL"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleNext = () => setStep((s) => Math.min(s + 1, 3));
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/stories/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                const data = await response.json();
                alert(data.error || "Submission failed");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            {/* Progress Header */}
            <div className="flex justify-between mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= s ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 dark:border-slate-700 text-slate-400"
                            }`}>
                            {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${step >= s ? "text-blue-600" : "text-slate-400"}`}>
                            {s === 1 ? "Start" : s === 2 ? "Compose" : "Finalize"}
                        </span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {step === 1 && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">What's your story about?</h2>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Give it a title *</label>
                                    <Input
                                        placeholder="E.g., My journey through same-sex marriage litigation"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="h-12 text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Topics (Select all that apply)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Child Marriage", "Same-Sex Rights", "Gender Inclusion", "Litigation Support"].map(t => (
                                            <Badge
                                                key={t}
                                                variant={formData.topics.includes(t) ? "default" : "outline"}
                                                className="cursor-pointer px-3 py-1 text-sm"
                                                onClick={() => {
                                                    const newTopics = formData.topics.includes(t)
                                                        ? formData.topics.filter(x => x !== t)
                                                        : [...formData.topics, t];
                                                    setFormData({ ...formData, topics: newTopics });
                                                }}
                                            >
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Write your story</h2>
                                <p className="text-slate-500 text-sm">Don't worry about perfect grammar. Just tell us what happened. You can use fake names if you prefer.</p>
                                <Textarea
                                    placeholder="Share your experience here..."
                                    className="min-h-[300px] text-lg leading-relaxed"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Privacy Settings</h2>

                                <div className="p-4 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold flex items-center gap-2">
                                            Anonymization Active
                                            <Badge variant="secondary" className="bg-blue-200 text-blue-800">Enabled</Badge>
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            Our system will automatically redact names, places, and sensitive PII from your story before any human views it.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                        onClick={() => setFormData({ ...formData, isAnonymized: !formData.isAnonymized })}>
                                        <div className="flex items-center gap-3">
                                            {formData.isAnonymized ? <EyeOff className="text-blue-600" /> : <Eye className="text-slate-400" />}
                                            <div>
                                                <p className="font-semibold">Keep me anonymous</p>
                                                <p className="text-xs text-slate-500">Your profile will be hidden from everyone except top-level admins.</p>
                                            </div>
                                        </div>
                                        <div className={`w-12 h-6 rounded-full transition-colors relative ${formData.isAnonymized ? "bg-blue-600" : "bg-slate-300"}`}>
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isAnonymized ? "left-7" : "left-1"}`} />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800 flex gap-3">
                                    <AlertTriangle className="text-amber-600 shrink-0 w-5 h-5" />
                                    <p className="text-xs text-amber-800 dark:text-amber-200">
                                        By submitting, you agree that NKS can use this story (redacted) for advocacy and legal awareness. You can request deletion at any time.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                            {step > 1 ? (
                                <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </Button>
                            ) : <div />}

                            {step < 3 ? (
                                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                                    Next Step <ChevronRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
                                >
                                    {isSubmitting ? "Submitting securely..." : "Submit My Story"}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-12 space-y-6"
                    >
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold">Story Submitted!</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                            Thank you for your courage. Your story is now being processed for redaction and will be reviewed by our advocacy team shortly.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button variant="outline" onClick={() => { setStep(1); setIsSuccess(false); setFormData({ title: "", content: "", topics: [], isAnonymized: true, sensitivityLevel: "NORMAL" }); }}>
                                Submit Another
                            </Button>
                            <Button className="bg-blue-600 border-none">Go to Dashboard</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Mock Icons since I don't know exactly what's imported until it's in a file
function Edit3(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    );
}

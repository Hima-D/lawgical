"use client";

import { useState } from "react";
import {
    Gavel,
    FileText,
    Clock,
    ChevronRight,
    AlertCircle,
    Download,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const statusColors = {
    INTAKE: "bg-blue-100 text-blue-800",
    DRAFTING: "bg-amber-100 text-amber-800",
    FILED: "bg-purple-100 text-purple-800",
    HEARING: "bg-indigo-100 text-indigo-800",
    CLOSED: "bg-green-100 text-green-800",
};

export default function CaseTracker({ cases }) {
    const [activeTab, setActiveTab] = useState("ALL");

    const filteredCases = activeTab === "ALL"
        ? cases
        : cases.filter(c => c.status === activeTab);

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {["ALL", "INTAKE", "DRAFTING", "FILED", "HEARING", "CLOSED"].map(status => (
                    <Button
                        key={status}
                        variant={activeTab === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab(status)}
                        className="rounded-full px-4"
                    >
                        {status}
                    </Button>
                ))}
            </div>

            <div className="grid gap-4">
                {filteredCases.map(caseItem => (
                    <Card key={caseItem.id} className="p-6 hover:shadow-md transition-all border-slate-200 dark:border-slate-800 group">
                        <div className="flex flex-col md:flex-row gap-6">

                            {/* Case Summary */}
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{caseItem.title}</h3>
                                        <p className="text-sm text-slate-500 mt-1">{caseItem.description}</p>
                                    </div>
                                    <Badge className={statusColors[caseItem.status]}>
                                        {caseItem.status}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Gavel className="w-3 h-3" />
                                        <span>Writ: {caseItem.writType || "Art. 32"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>Updated: {new Date(caseItem.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        <span>Workflow Progress</span>
                                        <span>{getProgress(caseItem.status)}%</span>
                                    </div>
                                    <Progress value={getProgress(caseItem.status)} className="h-1" />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 justify-center border-l dark:border-slate-800 pl-6 md:w-48">
                                <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                                    <FileText className="w-3 h-3" /> View Files
                                </Button>
                                <Button variant="outline" size="sm" className="w-full gap-2 text-xs bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                                    <Download className="w-3 h-3" /> Gen Draft
                                </Button>
                                <Button variant="ghost" size="sm" className="w-full text-xs">
                                    Manage Details
                                </Button>
                            </div>

                        </div>
                    </Card>
                ))}

                {filteredCases.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="font-bold text-slate-500">No cases found</h3>
                        <p className="text-sm text-slate-400">Try changing the filter or create a new case intake.</p>
                        <Button className="mt-4 gap-2">
                            <Plus className="w-4 h-4" /> New Intake
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function getProgress(status) {
    const mapping = {
        INTAKE: 20,
        DRAFTING: 40,
        FILED: 70,
        HEARING: 90,
        CLOSED: 100
    };
    return mapping[status] || 0;
}

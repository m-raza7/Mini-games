import React from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-2 gap-3">
            <button
                onClick={() => navigate("/money-tracker/income")}
                className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
            >
                <ArrowUpCircle className="h-5 w-5" />
                Add Income
            </button>

            <button
                onClick={() => navigate("/money-tracker/expense")}
                className="flex items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
            >
                <ArrowDownCircle className="h-5 w-5" />
                Add Expense
            </button>
        </div>
    );
};

export default QuickActions;
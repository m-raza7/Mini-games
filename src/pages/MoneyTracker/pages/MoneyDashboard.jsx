import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, ArrowRight, Plus } from "lucide-react";

import BalanceCard from "../components/BalanceCard";
import SummaryCards from "../components/SummaryCards";
import QuickActions from "../components/QuickActions";
import TransactionItem from "../components/TransactionItem";

import {
    getTransactions,
    deleteTransaction,
} from "../utils/storage";

import {
    calculateTotals,
} from "../utils/calculations";

const MoneyDashboard = () => {
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [refresh, setRefresh] = useState(0);

    // ==========================================
    // Load Transactions
    // ==========================================

    const loadTransactions = () => {
        const data = getTransactions();

        setTransactions(
            Array.isArray(data) ? data : []
        );
    };

    useEffect(() => {
        loadTransactions();
    }, [refresh]);

    // ==========================================
    // Calculate Totals
    // ==========================================

    const totals = calculateTotals(
        transactions
    );

    // ==========================================
    // Delete Transaction
    // ==========================================

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) {
            return;
        }

        deleteTransaction(id);

        setRefresh(
            (value) => value + 1
        );
    };

    // ==========================================
    // Recent Transactions
    // ==========================================

    const recentTransactions =
        transactions.slice(0, 5);

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className=" pt-20
            min-h-[calc(100vh-80px)]
            bg-slate-950
            px-4
            py-6
            text-white
            sm:px-6
            lg:px-8
        ">

            <div className="
                mx-auto
                max-w-5xl
                space-y-5
            ">

                {/* ================================= */}
                {/* Header */}
                {/* ================================= */}

                <div className="
                    flex
                    items-center
                    justify-between
                ">

                    <div>
                        {/* <p className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wider
                            text-white/40
                        ">
                            MiniVerse
                        </p> */}

                        <h1 className="
                            mt-3
                            text-2xl
                            font-bold
                            text-white
                            sm:text-3xl
                        ">
                            Money Tracker
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-white/40
                        ">
                            Manage your income and expenses
                        </p>
                    </div>

                    {/* Wallet Icon */}

                    <div className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-xl
                    ">
                        <Wallet className="
                            h-5
                            w-5
                            text-violet-400
                        " />
                    </div>

                </div>

                {/* ================================= */}
                {/* Balance Card */}
                {/* ================================= */}

                <BalanceCard
                    balance={totals.balance}
                    income={totals.totalIncome}
                    expense={totals.totalExpense}
                />

                {/* ================================= */}
                {/* Quick Actions */}
                {/* ================================= */}

                <QuickActions
                    onIncome={() => navigate("income")}
                    onExpense={() => navigate("expense")}
                />

                {/* ================================= */}
                {/* Summary Cards */}
                {/* ================================= */}

                <SummaryCards
                    income={totals.totalIncome}
                    expense={totals.totalExpense}
                    transactionCount={
                        transactions.length
                    }
                />

                {/* ================================= */}
                {/* Recent Transactions */}
                {/* ================================= */}

                <div>

                    {/* Section Header */}

                    <div className="
                        mb-3
                        flex
                        items-center
                        justify-between
                    ">

                        <div>
                            <h2 className="
                                font-semibold
                                text-white
                            ">
                                Recent Transactions
                            </h2>

                            <p className="
                                mt-0.5
                                text-xs
                                text-white/35
                            ">
                                Your latest money activity
                            </p>
                        </div>

                        {transactions.length > 0 && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/money-tracker/transactions"
                                    )
                                }
                                className="
                                    flex
                                    items-center
                                    gap-1
                                    text-xs
                                    font-medium
                                    text-violet-400
                                    transition
                                    hover:text-violet-300
                                "
                            >
                                View All

                                <ArrowRight className="
                                    h-3.5
                                    w-3.5
                                " />
                            </button>
                        )}

                    </div>

                    {/* ================================= */}
                    {/* Empty State */}
                    {/* ================================= */}

                    {recentTransactions.length === 0 ? (

                        <div className="
                            rounded-3xl
                            border
                            border-dashed
                            border-white/10
                            bg-white/[0.02]
                            px-6
                            py-12
                            text-center
                        ">

                            <div className="
                                mx-auto
                                mb-4
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-violet-500/10
                            ">
                                <Wallet className="
                                    h-6
                                    w-6
                                    text-violet-400
                                " />
                            </div>

                            <h3 className="
                                font-semibold
                                text-white
                            ">
                                No transactions yet
                            </h3>

                            <p className="
                                mx-auto
                                mt-1
                                max-w-sm
                                text-sm
                                text-white/40
                            ">
                                Start tracking your money
                                by adding your first income
                                or expense.
                            </p>

                            {/* Empty State Actions */}

                            <div className="
                                mx-auto
                                mt-5
                                grid
                                max-w-md
                                grid-cols-2
                                gap-3
                            ">

                                <button
                                    type="button"
                                    onClick={() => navigate("income")}
                                    className="
        flex
        h-11
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-emerald-400/20
        bg-emerald-500/10
        text-sm
        font-medium
        text-emerald-400
        transition
        hover:bg-emerald-500/20
    "
                                >
                                    <Plus className="h-4 w-4" />
                                    Income
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("expense")}
                                    className="
        flex
        h-11
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-red-400/20
        bg-red-500/10
        text-sm
        font-medium
        text-red-400
        transition
        hover:bg-red-500/20
    "
                                >
                                    <Plus className="h-4 w-4" />
                                    Expense
                                </button>

                            </div>

                        </div>

                    ) : (

                        /* ================================= */
                        /* Transaction List */
                        /* ================================= */

                        <div className="
                            space-y-2
                        ">

                            {recentTransactions.map(
                                (transaction) => (

                                    <TransactionItem
                                        key={
                                            transaction.id
                                        }
                                        transaction={
                                            transaction
                                        }
                                        onDelete={
                                            handleDelete
                                        }
                                    />

                                )
                            )}

                        </div>

                    )}

                </div>

                {/* ================================= */}
                {/* View All Button */}
                {/* ================================= */}

                {transactions.length > 5 && (

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/money-tracker/transactions"
                            )
                        }
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            py-3
                            text-sm
                            font-medium
                            text-white/60
                            transition
                            hover:bg-white/10
                            hover:text-white
                        "
                    >
                        View All Transactions

                        <ArrowRight className="
                            h-4
                            w-4
                        " />
                    </button>

                )}

            </div>

        </div>
    );
};

export default MoneyDashboard;
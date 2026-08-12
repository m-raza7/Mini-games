import { useMemo } from "react";

import {
    TrendingDown,
    TrendingUp,
} from "lucide-react";

import ExpenseChart from "../components/ExpenseChart";

import {
    getTransactions,
} from "../utils/storage";

import {
    calculateTotals,
    getCategoryTotals,
    formatCurrency,
} from "../utils/calculations";

const Analytics = () => {
    const transactions =
        getTransactions();

    const totals = useMemo(
        () =>
            calculateTotals(
                transactions
            ),
        [transactions]
    );

    const categoryTotals =
        useMemo(
            () =>
                getCategoryTotals(
                    transactions,
                    "expense"
                ),
            [transactions]
        );

    const chartData = Object.entries(
        categoryTotals
    )
        .map(([name, value]) => ({
            name,
            value,
        }))
        .sort(
            (a, b) =>
                b.value - a.value
        );

    const savingsRate =
        totals.totalIncome > 0
            ? (
                (totals.balance /
                    totals.totalIncome) *
                100
            ).toFixed(1)
            : 0;

    return (
        <div className="
            mx-auto
            max-w-5xl
            space-y-5
        ">
            <div>
                <h1 className="
                    text-2xl
                    font-bold
                    text-white
                ">
                    Analytics
                </h1>

                <p className="
                    mt-1
                    text-sm
                    text-white/40
                ">
                    Understand your spending
                    habits
                </p>
            </div>

            {/* Main stats */}

            <div className="
                grid
                grid-cols-2
                gap-3
                md:grid-cols-3
            ">
                <div className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    p-4
                ">
                    <TrendingUp
                        size={20}
                        className="
                            text-emerald-400
                        "
                    />

                    <p className="
                        mt-3
                        text-xs
                        text-white/40
                    ">
                        Total Income
                    </p>

                    <p className="
                        mt-1
                        text-lg
                        font-bold
                        text-white
                    ">
                        {formatCurrency(
                            totals.totalIncome
                        )}
                    </p>
                </div>

                <div className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    p-4
                ">
                    <TrendingDown
                        size={20}
                        className="
                            text-red-400
                        "
                    />

                    <p className="
                        mt-3
                        text-xs
                        text-white/40
                    ">
                        Total Expenses
                    </p>

                    <p className="
                        mt-1
                        text-lg
                        font-bold
                        text-white
                    ">
                        {formatCurrency(
                            totals.totalExpense
                        )}
                    </p>
                </div>

                <div className="
                    col-span-2
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    p-4
                    md:col-span-1
                ">
                    <p className="
                        text-xs
                        text-white/40
                    ">
                        Savings Rate
                    </p>

                    <p className="
                        mt-1
                        text-2xl
                        font-bold
                        text-violet-400
                    ">
                        {savingsRate}%
                    </p>
                </div>
            </div>

            <ExpenseChart
                data={chartData}
            />

            {/* Categories */}

            <div className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.05]
                p-5
            ">
                <h2 className="
                    font-semibold
                    text-white
                ">
                    Spending by Category
                </h2>

                <div className="
                    mt-4
                    space-y-3
                ">
                    {chartData.length ===
                        0 ? (
                        <p className="
                            py-5
                            text-center
                            text-sm
                            text-white/40
                        ">
                            No expense data
                            available
                        </p>
                    ) : (
                        chartData.map(
                            (item) => {
                                const percentage =
                                    totals.totalExpense >
                                        0
                                        ? (
                                            (item.value /
                                                totals.totalExpense) *
                                            100
                                        ).toFixed(
                                            0
                                        )
                                        : 0;

                                return (
                                    <div
                                        key={
                                            item.name
                                        }
                                    >
                                        <div className="
                                            flex
                                            justify-between
                                            text-sm
                                        ">
                                            <span className="
                                                text-white/60
                                            ">
                                                {
                                                    item.name
                                                }
                                            </span>

                                            <span className="
                                                text-white
                                            ">
                                                {formatCurrency(
                                                    item.value
                                                )}
                                            </span>
                                        </div>

                                        <div className="
                                            mt-2
                                            h-2
                                            overflow-hidden
                                            rounded-full
                                            bg-white/10
                                        ">
                                            <div
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-violet-500
                                                "
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
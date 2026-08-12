import { useEffect, useMemo, useState } from "react";
import {
    ArrowDownLeft,
    ArrowUpRight,
    Search,
    Trash2,
    Filter,
    CalendarDays,
    Wallet,
    X,
    ArrowLeft,
} from "lucide-react";

import {
    getTransactions,
    deleteTransaction,
} from "../utils/storage";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

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
    }, []);

    // ==========================================
    // Categories
    // ==========================================

    const categories = useMemo(() => {
        return [
            ...new Set(
                transactions
                    .map((transaction) => transaction.category)
                    .filter(Boolean)
            ),
        ];
    }, [transactions]);

    // ==========================================
    // Filter Transactions
    // ==========================================

    const filteredTransactions = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return transactions.filter((transaction) => {
            const matchesSearch =
                !searchText ||
                transaction.title
                    ?.toLowerCase()
                    .includes(searchText) ||
                transaction.category
                    ?.toLowerCase()
                    .includes(searchText) ||
                transaction.description
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesType =
                typeFilter === "all" ||
                transaction.type === typeFilter;

            const matchesCategory =
                categoryFilter === "all" ||
                transaction.category === categoryFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );
        });
    }, [
        transactions,
        search,
        typeFilter,
        categoryFilter,
    ]);

    // ==========================================
    // Delete
    // ==========================================

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) return;

        deleteTransaction(id);

        loadTransactions();
    };

    // ==========================================
    // Clear Filters
    // ==========================================

    const clearFilters = () => {
        setSearch("");
        setTypeFilter("all");
        setCategoryFilter("all");
    };

    const hasFilters =
        search ||
        typeFilter !== "all" ||
        categoryFilter !== "all";

    // ==========================================
    // Format Amount
    // ==========================================

    const formatAmount = (amount) => {
        return Number(amount || 0).toLocaleString(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }
        );
    };

    // ==========================================
    // Format Date
    // ==========================================

    const formatDate = (date) => {
        if (!date) return "";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // ==========================================
    // UI
    // ==========================================

    return (
        <div
            className="pt-20
                min-h-screen
                bg-slate-950
                px-4
                py-6
                text-white
                sm:px-6
                lg:px-8
            "
        >
            <div
                className="
                    mx-auto
                    max-w-5xl
                    space-y-6
                "
            >
                {/* ================================= */}
                {/* Header */}
                {/* ================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >
                    <div>
                        {/* <p
                            className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-wider
                                text-violet-400
                            "
                        >
                            Money Tracker
                        </p> */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/money-tracker")
                            }
                            className="
                        my-6
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-3
                        py-2
                        text-sm
                        text-white/60
                        transition
                        hover:bg-white/10
                        hover:text-white
                    "
                        >
                            <ArrowLeft size={17} />

                            Back to Money Tracker
                        </button>

                        <h1
                            className="
                                mt-3
                                text-2xl
                                font-bold
                                tracking-tight
                                text-white
                                sm:text-3xl
                            "
                        >
                            Transactions
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-white/40
                            "
                        >
                            View and manage your money activity
                        </p>
                    </div>

                    {/* Wallet */}

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-violet-400/20
                            bg-violet-500/10
                            shadow-lg
                            shadow-violet-500/5
                        "
                    >
                        <Wallet
                            className="
                                h-5
                                w-5
                                text-violet-400
                            "
                        />
                    </div>
                </div>

                {/* ================================= */}
                {/* Filters */}
                {/* ================================= */}

                <div
                    className="
                        rounded-3xl
                        border
                        border-white/10
                        bg-slate-900/80
                        p-3
                        shadow-xl
                        shadow-black/20
                    "
                >
                    <div
                        className="
                            grid
                            gap-2
                            md:grid-cols-[1.5fr_1fr_1fr]
                        "
                    >
                        {/* Search */}

                        <div className="relative">
                            <Search
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-white/30
                                "
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search transactions..."
                                className="
                                    h-11
                                    w-full
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/30
                                    pl-10
                                    pr-4
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    placeholder:text-white/25
                                    focus:border-violet-400/40
                                    focus:bg-black/40
                                "
                            />
                        </div>

                        {/* Type */}

                        <div className="relative">
                            <Filter
                                className="
                                    pointer-events-none
                                    absolute
                                    left-3
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-white/30
                                "
                            />

                            <select
                                value={typeFilter}
                                onChange={(e) =>
                                    setTypeFilter(
                                        e.target.value
                                    )
                                }
                                className="
                                    h-11
                                    w-full
                                    appearance-none
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/30
                                    pl-10
                                    pr-4
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    focus:border-violet-400/40
                                "
                            >
                                <option
                                    value="all"
                                    className="bg-slate-900"
                                >
                                    All Types
                                </option>

                                <option
                                    value="income"
                                    className="bg-slate-900"
                                >
                                    Income
                                </option>

                                <option
                                    value="expense"
                                    className="bg-slate-900"
                                >
                                    Expense
                                </option>
                            </select>
                        </div>

                        {/* Category */}

                        <select
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(
                                    e.target.value
                                )
                            }
                            className="
                                h-11
                                w-full
                                rounded-2xl
                                border
                                border-white/10
                                bg-black/30
                                px-4
                                text-sm
                                text-white
                                outline-none
                                transition
                                focus:border-violet-400/40
                            "
                        >
                            <option
                                value="all"
                                className="bg-slate-900"
                            >
                                All Categories
                            </option>

                            {categories.map(
                                (category) => (
                                    <option
                                        key={category}
                                        value={category}
                                        className="bg-slate-900"
                                    >
                                        {category}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>

                {/* ================================= */}
                {/* Result Header */}
                {/* ================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                text-sm
                                font-medium
                                text-white/70
                            "
                        >
                            {filteredTransactions.length}{" "}
                            {filteredTransactions.length === 1
                                ? "transaction"
                                : "transactions"}
                        </p>

                        {hasFilters && (
                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-violet-400
                                "
                            >
                                Filtered results
                            </p>
                        )}
                    </div>

                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="
                                flex
                                items-center
                                gap-1.5
                                rounded-xl
                                border
                                border-white/10
                                bg-white/5
                                px-3
                                py-2
                                text-xs
                                font-medium
                                text-white/50
                                transition
                                hover:border-white/20
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            <X className="h-3.5 w-3.5" />

                            Clear
                        </button>
                    )}
                </div>

                {/* ================================= */}
                {/* Empty State */}
                {/* ================================= */}

                {filteredTransactions.length === 0 ? (
                    <div
                        className="
                            rounded-3xl
                            border
                            border-dashed
                            border-white/10
                            bg-slate-900/60
                            px-6
                            py-16
                            text-center
                        "
                    >
                        <div
                            className="
                                mx-auto
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-violet-400/10
                                bg-violet-500/10
                            "
                        >
                            <Wallet
                                className="
                                    h-7
                                    w-7
                                    text-violet-400
                                "
                            />
                        </div>

                        <h2
                            className="
                                mt-5
                                text-lg
                                font-semibold
                                text-white
                            "
                        >
                            No transactions found
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-1
                                max-w-sm
                                text-sm
                                text-white/35
                            "
                        >
                            {hasFilters
                                ? "Try changing your search or filters."
                                : "Add an income or expense to see it here."}
                        </p>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="
                                    mt-5
                                    rounded-xl
                                    bg-violet-500/10
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-violet-400
                                    transition
                                    hover:bg-violet-500/20
                                "
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    /* ================================= */
                    /* Transaction List */
                    /* ================================= */

                    <div className="space-y-2.5">
                        {filteredTransactions.map(
                            (transaction) => {
                                const isIncome =
                                    transaction.type ===
                                    "income";

                                return (
                                    <div
                                        key={
                                            transaction.id
                                        }
                                        className="
                                            group
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-slate-900/70
                                            p-3
                                            transition-all
                                            duration-200
                                            hover:border-white/15
                                            hover:bg-slate-900
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >
                                            {/* Icon */}

                                            <div
                                                className={`
                                                    flex
                                                    h-11
                                                    w-11
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    ${isIncome
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : "bg-red-500/10 text-red-400"
                                                    }
                                                `}
                                            >
                                                {isIncome ? (
                                                    <ArrowDownLeft
                                                        className="h-5 w-5"
                                                    />
                                                ) : (
                                                    <ArrowUpRight
                                                        className="h-5 w-5"
                                                    />
                                                )}
                                            </div>

                                            {/* Details */}

                                            <div
                                                className="
                                                    min-w-0
                                                    flex-1
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        min-w-0
                                                        flex-wrap
                                                        items-center
                                                        gap-2
                                                    "
                                                >
                                                    <h3
                                                        className="
                                                            max-w-[220px]
                                                            truncate
                                                            text-sm
                                                            font-semibold
                                                            text-white
                                                            sm:max-w-md
                                                        "
                                                    >
                                                        {transaction.title ||
                                                            transaction.category ||
                                                            "Transaction"}
                                                    </h3>

                                                    {transaction.category && (
                                                        <span
                                                            className={`
                                                                rounded-lg
                                                                px-2
                                                                py-0.5
                                                                text-[10px]
                                                                font-medium
                                                                ${isIncome
                                                                    ? "bg-emerald-500/10 text-emerald-400"
                                                                    : "bg-red-500/10 text-red-400"
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                transaction.category
                                                            }
                                                        </span>
                                                    )}
                                                </div>

                                                <div
                                                    className="
                                                        mt-1.5
                                                        flex
                                                        flex-wrap
                                                        items-center
                                                        gap-2
                                                        text-[11px]
                                                        text-white/35
                                                    "
                                                >
                                                    <span
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-1
                                                        "
                                                    >
                                                        <CalendarDays className="h-3 w-3" />

                                                        {formatDate(
                                                            transaction.date
                                                        )}
                                                    </span>

                                                    {transaction.paymentMethod && (
                                                        <>
                                                            <span>
                                                                •
                                                            </span>

                                                            <span className="capitalize">
                                                                {
                                                                    transaction.paymentMethod
                                                                }
                                                            </span>
                                                        </>
                                                    )}

                                                    {transaction.description && (
                                                        <>
                                                            <span>
                                                                •
                                                            </span>

                                                            <span
                                                                className="
                                                                    max-w-[160px]
                                                                    truncate
                                                                    sm:max-w-[260px]
                                                                "
                                                            >
                                                                {
                                                                    transaction.description
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Amount */}

                                            <div
                                                className="
                                                    shrink-0
                                                    text-right
                                                "
                                            >
                                                <p
                                                    className={`
                                                        text-sm
                                                        font-bold
                                                        sm:text-base
                                                        ${isIncome
                                                            ? "text-emerald-400"
                                                            : "text-red-400"
                                                        }
                                                    `}
                                                >
                                                    {isIncome
                                                        ? "+"
                                                        : "-"}
                                                    {formatAmount(
                                                        transaction.amount
                                                    )}
                                                </p>

                                                <p
                                                    className={`
                                                        mt-0.5
                                                        text-[10px]
                                                        font-medium
                                                        capitalize
                                                        ${isIncome
                                                            ? "text-emerald-400/50"
                                                            : "text-red-400/50"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        transaction.type
                                                    }
                                                </p>
                                            </div>

                                            {/* Delete */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(
                                                        transaction.id
                                                    )
                                                }
                                                className="
                                                    flex
                                                    h-9
                                                    w-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    text-white/20
                                                    transition
                                                    hover:bg-red-500/10
                                                    hover:text-red-400
                                                    sm:opacity-0
                                                    sm:group-hover:opacity-100
                                                "
                                                title="Delete transaction"
                                                aria-label="Delete transaction"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import ExpenseCard from "./ExpenseCard";
import AddItem from "./AddItem";
import SearchBar from "./SearchBar";
import Summary from "./Summary";

const STORAGE_KEY = "expenses";

const ExpenseTracker = () => {
    // Load from localStorage only once
    const [expenses, setExpenses] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Save to localStorage whenever expenses change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }, [expenses]);

    // Add / Update
    const handleSave = (item) => {
        const newExpense = {
            id: editingItem ? editingItem.id : Date.now(),
            name: item.name.trim(),
            category: item.category,
            price: Number(item.price),
            quantity: Number(item.quantity),
            unit: item.unit,
        };

        if (editingItem) {
            setExpenses((prev) =>
                prev.map((expense) =>
                    expense.id === editingItem.id ? newExpense : expense
                )
            );
        } else {
            setExpenses((prev) => [...prev, newExpense]);
        }

        setEditingItem(null);
        setIsModalOpen(false);
    };

    // Delete
    const handleDelete = (id) => {
        if (!window.confirm("Delete this item?")) return;

        setExpenses((prev) =>
            prev.filter((expense) => expense.id !== id)
        );
    };

    // Increase Quantity
    const handleIncrease = (id) => {
        setExpenses((prev) =>
            prev.map((expense) => {
                if (expense.id !== id) return expense;

                if (
                    !["Shopping", "Fuel"].includes(expense.category)
                ) {
                    return expense;
                }

                return {
                    ...expense,
                    quantity: expense.quantity + 1,
                };
            })
        );
    };

    // Decrease Quantity
    const handleDecrease = (id) => {
        setExpenses((prev) =>
            prev.map((expense) => {
                if (expense.id !== id) return expense;

                if (
                    !["Shopping", "Fuel"].includes(expense.category)
                ) {
                    return expense;
                }

                if (expense.quantity <= 1) return expense;

                return {
                    ...expense,
                    quantity: expense.quantity - 1,
                };
            })
        );
    };

    // Edit
    const handleEdit = (expense) => {
        setEditingItem(expense);
        setIsModalOpen(true);
    };

    // Search
    const filteredExpenses = expenses.filter((expense) =>
        expense.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white pt-4">

            {/* Background Glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">

                <div className="
            absolute
            -left-40
            -top-40
            h-96
            w-96
            rounded-full
            bg-violet-600/20
            blur-[130px]
        " />

                <div className="
            absolute
            -right-40
            top-1/4
            h-96
            w-96
            rounded-full
            bg-blue-600/15
            blur-[130px]
        " />

                <div className="
            absolute
            -bottom-40
            left-1/3
            h-96
            w-96
            rounded-full
            bg-pink-600/10
            blur-[130px]
        " />

            </div>


            {/* Main */}
            <div className="
        relative
        z-10
        mx-auto
        w-full
        max-w-6xl
        px-3
        pb-24
        pt-16
        sm:px-5
        sm:pb-10
        sm:pt-20
        lg:pt-24
    ">

                {/* Main Card */}
                <div className="
            rounded-[26px]
            border
            border-white/[0.08]
            bg-white/[0.035]
            p-4
            shadow-2xl
            shadow-black/30
            backdrop-blur-2xl
            sm:rounded-[30px]
            sm:p-6
            lg:p-7
        ">

                    {/* Header */}
                    <div className="
                mb-5
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                        {/* Title */}
                        <div className="flex items-center gap-3">

                            <div className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-[14px]
                        border
                        border-violet-400/20
                        bg-violet-500/10
                        shadow-lg
                        shadow-violet-500/10
                    ">
                                <span className="text-xl">
                                    🛒
                                </span>
                            </div>


                            <div>

                                <h1 className="
                            text-xl
                            font-extrabold
                            tracking-tight
                            text-white
                            sm:text-2xl
                            lg:text-3xl
                        ">
                                    Expense Tracker
                                </h1>

                                <p className="
                            mt-0.5
                            text-[9px]
                            text-slate-500
                            sm:text-xs
                        ">
                                    Manage and track your daily expenses
                                </p>

                            </div>

                        </div>


                        {/* Desktop Add Button */}
                        <button
                            onClick={() => {
                                setEditingItem(null);
                                setIsModalOpen(true);
                            }}
                            className="
                        hidden
                        h-10
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-gradient-to-r
                        from-violet-600
                        to-purple-600
                        px-5
                        text-xs
                        font-bold
                        text-white
                        shadow-lg
                        shadow-violet-500/20
                        transition
                        hover:from-violet-500
                        hover:to-purple-500
                        active:scale-95
                        sm:flex
                    "
                        >
                            <Plus size={16} />
                            Add Expense
                        </button>

                    </div>


                    {/* Search */}
                    <div className="mb-5">

                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />

                    </div>


                    {/* Summary */}
                    <div className="mb-5">

                        <Summary expenses={expenses} />

                    </div>


                    {/* Section Header */}
                    <div className="
                mb-3
                flex
                items-center
                justify-between
            ">

                        <div className="flex items-center gap-2">

                            <div className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-violet-400
                        shadow-[0_0_8px_rgba(167,139,250,0.8)]
                    " />

                            <h2 className="
                        text-xs
                        font-bold
                        text-slate-300
                        sm:text-sm
                    ">
                                Your Expenses
                            </h2>

                        </div>


                        <span className="
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/[0.035]
                    px-2.5
                    py-1
                    text-[9px]
                    text-slate-500
                ">
                            {filteredExpenses.length} items
                        </span>

                    </div>


                    {/* Expense Cards */}
                    <div className="space-y-2.5 sm:space-y-3">

                        {filteredExpenses.length === 0 ? (

                            /* Empty State */
                            <div className="
                        rounded-[22px]
                        border
                        border-dashed
                        border-white/[0.08]
                        bg-black/10
                        px-5
                        py-12
                        text-center
                    ">

                                <div className="
                            mx-auto
                            mb-3
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-[18px]
                            border
                            border-white/[0.06]
                            bg-white/[0.035]
                        ">
                                    <span className="text-2xl">
                                        💸
                                    </span>
                                </div>

                                <h3 className="
                            text-sm
                            font-semibold
                            text-slate-400
                        ">
                                    No Expense Found
                                </h3>

                                <p className="
                            mt-1
                            text-[10px]
                            text-slate-600
                        ">
                                    Add your first expense to get started
                                </p>

                            </div>

                        ) : (

                            filteredExpenses.map((expense) => (

                                <ExpenseCard
                                    key={expense.id}
                                    expense={expense}
                                    onIncrease={handleIncrease}
                                    onDecrease={handleDecrease}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />

                            ))

                        )}

                    </div>

                </div>

            </div>


            {/* Add / Edit Modal */}
            <AddItem
                isOpen={isModalOpen}
                editingItem={editingItem}
                onClose={() => {
                    setEditingItem(null);
                    setIsModalOpen(false);
                }}
                onSave={handleSave}
            />


            {/* Mobile Floating Add Button */}
            <button
                onClick={() => {
                    setEditingItem(null);
                    setIsModalOpen(true);
                }}
                className="
            fixed
            bottom-5
            right-5
            z-40
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-violet-300/20
            bg-gradient-to-r
            from-violet-600
            to-purple-600
            text-white
            shadow-xl
            shadow-violet-900/40
            transition
            hover:scale-105
            active:scale-90
            sm:bottom-6
            sm:right-6
            sm:h-14
            sm:w-14
            md:hidden
        "
            >
                <Plus size={22} />
            </button>

        </div>
    );
};

export default ExpenseTracker;
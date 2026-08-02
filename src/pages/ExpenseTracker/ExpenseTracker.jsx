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
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 pt-10 lg:pt-23">

            <div className="mx-auto max-w-6xl p-5">

                <div className="rounded-3xl bg-white p-6 shadow-2xl">

                    <h1 className="mb-6 text-center text-4xl font-bold">
                        🛒 Expense Tracker
                    </h1>

                    {/* Search */}

                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    {/* Add */}

                    <div className="mt-5 flex justify-end">
                        <button
                            onClick={() => {
                                setEditingItem(null);
                                setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
                        >
                            <Plus size={20} />
                            Add Item
                        </button>
                    </div>

                    {/* Summary */}

                    <div className="mt-8">
                        <Summary expenses={expenses} />
                    </div>

                    {/* Cards */}

                    <div className="mt-8 space-y-5">

                        {filteredExpenses.length === 0 ? (
                            <div className="rounded-xl bg-gray-100 p-10 text-center text-gray-500">
                                No Expense Found
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

            {/* Modal */}

            <AddItem
                isOpen={isModalOpen}
                editingItem={editingItem}
                onClose={() => {
                    setEditingItem(null);
                    setIsModalOpen(false);
                }}
                onSave={handleSave}
            />

            {/* Floating Button */}

            <button
                onClick={() => {
                    setEditingItem(null);
                    setIsModalOpen(true);
                }}
                className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-xl transition hover:scale-110 md:hidden"
            >
                <Plus size={28} />
            </button>

        </div>
    );
};

export default ExpenseTracker;
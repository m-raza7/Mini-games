import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Wallet,
    CalendarDays,
    CreditCard,
    FileText,
} from "lucide-react";

import { incomeCategories } from "../data/categories";
import { addTransaction } from "../utils/storage";

const AddIncome = () => {
    const navigate = useNavigate();

    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("bank");

    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [loading, setLoading] = useState(false);

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount) {
            alert("Please enter amount");
            return;
        }

        if (Number(amount) <= 0) {
            alert("Amount must be greater than 0");
            return;
        }

        if (!title.trim()) {
            alert("Please enter income name");
            return;
        }

        if (!category) {
            alert("Please select a category");
            return;
        }

        try {
            setLoading(true);

            addTransaction({
                type: "income",
                title: title.trim(),
                amount: Number(amount),
                category,
                description: description.trim(),
                paymentMethod,
                date,
            });

            // Go back to Money Tracker dashboard
            navigate("/money-tracker");

        } catch (error) {
            console.error(
                "Failed to save income:",
                error
            );

            alert("Failed to save income");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="
            min-h-[calc(100vh-80px)]
            bg-slate-950
            px-4
            pb-10
            pt-24
            text-white
            sm:px-6
            lg:px-8
        ">

            <div className="
                mx-auto
                max-w-2xl
            ">

                {/* ================================= */}
                {/* Back Button */}
                {/* ================================= */}

                {/* <button
                    type="button"
                    onClick={() =>
                        navigate("/money-tracker")
                    }
                    className="
                        mb-6
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
                </button> */}

                {/* ================================= */}
                {/* Header */}
                {/* ================================= */}

                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/money-tracker")
                            }
                            className="
                        mb-6
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

                            Back To Money Tracker
                        </button>

                        <div className="
                        mb-3
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-emerald-400/20
                        bg-emerald-500/10
                    ">
                            <Wallet
                                className="
                                h-6
                                w-6
                                text-emerald-400
                            "
                            />
                        </div>
                    </div>


                    <h1 className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-3xl
                    ">
                        Add Income
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-white/40
                    ">
                        Record money you received
                        and keep your balance updated.
                    </p>

                </div>

                {/* ================================= */}
                {/* Form */}
                {/* ================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        shadow-2xl
                        shadow-black/20
                        backdrop-blur-xl
                    "
                >

                    <div className="
                        space-y-6
                        p-5
                        sm:p-7
                    ">

                        {/* ================================= */}
                        {/* Amount */}
                        {/* ================================= */}

                        <div>

                            <label className="
                                text-sm
                                font-medium
                                text-white/70
                            ">
                                Amount
                            </label>

                            <div className="
                                relative
                                mt-2
                            ">

                                <span className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-2xl
                                    font-semibold
                                    text-emerald-400
                                ">
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(
                                            e.target.value
                                        )
                                    }
                                    placeholder="0.00"
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-black/20
                                        py-5
                                        pl-11
                                        pr-4
                                        text-3xl
                                        font-bold
                                        text-white
                                        outline-none
                                        transition
                                        placeholder:text-white/15
                                        focus:border-emerald-400/40
                                        focus:ring-4
                                        focus:ring-emerald-500/5
                                    "
                                />

                            </div>

                        </div>

                        {/* ================================= */}
                        {/* Income Name */}
                        {/* ================================= */}

                        <div>

                            <label className="
                                text-sm
                                font-medium
                                text-white/70
                            ">
                                Income Name
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) =>
                                    setTitle(
                                        e.target.value
                                    )
                                }
                                placeholder="e.g. Monthly Salary"
                                className="
                                    mt-2
                                    w-full
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    px-4
                                    py-3.5
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    placeholder:text-white/25
                                    focus:border-emerald-400/40
                                    focus:ring-4
                                    focus:ring-emerald-500/5
                                "
                            />

                        </div>

                        {/* ================================= */}
                        {/* Category */}
                        {/* ================================= */}

                        <div>

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">
                                <label className="
                                    text-sm
                                    font-medium
                                    text-white/70
                                ">
                                    Category
                                </label>

                                {category && (
                                    <span className="
                                        text-xs
                                        text-emerald-400
                                    ">
                                        Selected
                                    </span>
                                )}
                            </div>

                            <div className="
                                mt-2
                                grid
                                grid-cols-2
                                gap-2
                                sm:grid-cols-4
                            ">

                                {incomeCategories.map(
                                    (item) => {

                                        const Icon =
                                            item.icon;

                                        const selected =
                                            category ===
                                            item.name;

                                        return (
                                            <button
                                                type="button"
                                                key={item.id}
                                                onClick={() =>
                                                    setCategory(
                                                        item.name
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    min-h-[90px]
                                                    flex-col
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    rounded-2xl
                                                    border
                                                    p-3
                                                    text-xs
                                                    font-medium
                                                    transition
                                                    active:scale-[0.98]
                                                    ${selected
                                                        ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/5"
                                                        : "border-white/10 bg-white/[0.025] text-white/50 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80"
                                                    }
                                                `}
                                            >
                                                <Icon
                                                    size={21}
                                                />

                                                <span className="
                                                    text-center
                                                ">
                                                    {item.name}
                                                </span>
                                            </button>
                                        );
                                    }
                                )}

                            </div>

                        </div>

                        {/* ================================= */}
                        {/* Date + Payment */}
                        {/* ================================= */}

                        <div className="
                            grid
                            grid-cols-1
                            gap-5
                            sm:grid-cols-2
                        ">

                            {/* Date */}

                            <div>

                                <label className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-white/70
                                ">
                                    <CalendarDays
                                        size={15}
                                    />

                                    Date
                                </label>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) =>
                                        setDate(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        mt-2
                                        w-full
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-black/20
                                        px-4
                                        py-3.5
                                        text-sm
                                        text-white
                                        outline-none
                                        focus:border-emerald-400/40
                                    "
                                />

                            </div>

                            {/* Payment */}

                            <div>

                                <label className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-white/70
                                ">
                                    <CreditCard
                                        size={15}
                                    />

                                    Payment Method
                                </label>

                                <select
                                    value={
                                        paymentMethod
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        mt-2
                                        w-full
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-black/20
                                        px-4
                                        py-3.5
                                        text-sm
                                        text-white
                                        outline-none
                                        focus:border-emerald-400/40
                                    "
                                >
                                    <option
                                        value="bank"
                                        className="bg-slate-900"
                                    >
                                        Bank
                                    </option>

                                    <option
                                        value="upi"
                                        className="bg-slate-900"
                                    >
                                        UPI
                                    </option>

                                    <option
                                        value="cash"
                                        className="bg-slate-900"
                                    >
                                        Cash
                                    </option>

                                    <option
                                        value="card"
                                        className="bg-slate-900"
                                    >
                                        Card
                                    </option>

                                    <option
                                        value="other"
                                        className="bg-slate-900"
                                    >
                                        Other
                                    </option>
                                </select>

                            </div>

                        </div>

                        {/* ================================= */}
                        {/* Description */}
                        {/* ================================= */}

                        <div>

                            <label className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-white/70
                            ">
                                <FileText
                                    size={15}
                                />

                                Note
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                rows={3}
                                placeholder="Optional note..."
                                className="
                                    mt-2
                                    w-full
                                    resize-none
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    px-4
                                    py-3.5
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    placeholder:text-white/25
                                    focus:border-emerald-400/40
                                    focus:ring-4
                                    focus:ring-emerald-500/5
                                "
                            />

                        </div>

                    </div>

                    {/* ================================= */}
                    {/* Bottom Action */}
                    {/* ================================= */}

                    <div className="
                        border-t
                        border-white/10
                        bg-black/10
                        p-5
                        sm:p-7
                    ">

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-emerald-500
                                px-4
                                py-4
                                text-sm
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-emerald-500/10
                                transition
                                hover:bg-emerald-400
                                active:scale-[0.99]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            <Plus size={20} />

                            {loading
                                ? "Saving..."
                                : "Add Income"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddIncome;
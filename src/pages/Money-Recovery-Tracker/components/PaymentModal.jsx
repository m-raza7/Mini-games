// src/pages/Money-Recovery-Tracker/components/PaymentModal.jsx

import { useEffect, useState } from "react";

import {
    CalendarDays,
    Clock,
    IndianRupee,
    X,
} from "lucide-react";

import { useMoneyRecovery } from "../context/MoneyRecoveryContext";

import {
    getRemainingAmount,
} from "../utils/calculations";

import {
    formatCurrency,
} from "../utils/formatters";

const PaymentModal = ({
    recovery,
    onClose,
}) => {
    const { addPayment } =
        useMoneyRecovery();

    const [amount, setAmount] =
        useState("");

    const [date, setDate] =
        useState(
            new Date()
                .toISOString()
                .split("T")[0]
        );

    const [time, setTime] =
        useState(
            new Date()
                .toTimeString()
                .slice(0, 5)
        );

    const [note, setNote] =
        useState("");

    const [error, setError] =
        useState("");

    // ---------------------------------------------------------
    // Reset form when recovery changes
    // ---------------------------------------------------------

    useEffect(() => {
        setAmount("");
        setError("");

        setDate(
            new Date()
                .toISOString()
                .split("T")[0]
        );

        setTime(
            new Date()
                .toTimeString()
                .slice(0, 5)
        );

        setNote("");
    }, [recovery]);

    // ---------------------------------------------------------
    // Safety
    // ---------------------------------------------------------

    if (!recovery) {
        return null;
    }

    // ---------------------------------------------------------
    // Remaining amount
    // ---------------------------------------------------------

    const remaining =
        getRemainingAmount(recovery);

    // ---------------------------------------------------------
    // Submit
    // ---------------------------------------------------------

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        const paymentAmount =
            Number(amount);

        // Validate amount

        if (
            !paymentAmount ||
            paymentAmount <= 0
        ) {
            setError(
                "Enter a valid payment amount."
            );

            return;
        }

        // Validate maximum amount

        if (
            paymentAmount > remaining
        ) {
            setError(
                `Payment cannot be greater than remaining amount ${formatCurrency(
                    remaining
                )}.`
            );

            return;
        }

        // Save payment

        addPayment(recovery.id, {
            amount: paymentAmount,
            date,
            time,
            note: note.trim(),
        });

        // Close modal

        onClose();
    };

    // ---------------------------------------------------------
    // Modal
    // ---------------------------------------------------------

    return (
        <div
            className="
        fixed
        inset-0
        z-[100]
        flex
        items-end
        justify-center
        bg-[#020617]/80
        p-0
        backdrop-blur-md
        sm:items-center
        sm:p-4
    "
            onMouseDown={onClose}
        >
            {/* Modal */}
            <div
                className="
            flex
            max-h-[94vh]
            w-full
            flex-col
            overflow-hidden
            rounded-t-[26px]
            border
            border-white/[0.08]
            bg-[#0b1120]
            text-white
            shadow-2xl
            shadow-black/50
            sm:max-w-lg
            sm:rounded-[26px]
        "
                onMouseDown={(e) => e.stopPropagation()}
            >

                {/* =====================================================
            HEADER
        ====================================================== */}
                <div
                    className="
                sticky
                top-0
                z-10
                flex
                shrink-0
                items-center
                justify-between
                gap-3
                border-b
                border-white/[0.08]
                bg-[#0b1120]/95
                px-4
                py-4
                backdrop-blur-xl
                sm:px-6
                sm:py-5
            "
                >
                    <div className="flex min-w-0 items-center gap-3">

                        {/* Payment Icon */}
                        <div
                            className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-[14px]
                        border
                        border-emerald-400/15
                        bg-emerald-400/[0.08]
                        text-emerald-400
                    "
                        >
                            <IndianRupee size={19} />
                        </div>

                        <div className="min-w-0">

                            <h2
                                className="
                            truncate
                            text-base
                            font-bold
                            tracking-tight
                            text-white
                            sm:text-xl
                        "
                            >
                                Add Payment
                            </h2>

                            <p
                                className="
                            mt-0.5
                            truncate
                            text-[9px]
                            text-slate-500
                            sm:text-xs
                        "
                            >
                                Record a payment from{" "}
                                <span className="font-semibold text-emerald-400">
                                    {recovery.personName || "this person"}
                                </span>
                            </p>

                        </div>

                    </div>

                    {/* Close */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    text-slate-400
                    transition
                    hover:bg-red-400/10
                    hover:text-red-400
                    active:scale-90
                "
                    >
                        <X size={17} />
                    </button>

                </div>


                {/* =====================================================
            SCROLLABLE CONTENT
        ====================================================== */}
                <div
                    className="
                min-h-0
                flex-1
                overflow-y-auto
                overscroll-contain
            "
                >
                    <div
                        className="
                    space-y-5
                    p-4
                    sm:p-6
                "
                    >

                        {/* =================================================
                    PAYMENT SUMMARY
                ================================================== */}
                        <div className="grid grid-cols-2 gap-3">

                            {/* Total */}
                            <div
                                className="
                            rounded-[18px]
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-3.5
                            sm:p-4
                        "
                            >
                                <p className="text-[9px] font-medium text-slate-500 sm:text-xs">
                                    Total Amount
                                </p>

                                <p
                                    className="
                                mt-1
                                text-base
                                font-bold
                                text-white
                                sm:text-lg
                            "
                                >
                                    {formatCurrency(recovery.amount)}
                                </p>
                            </div>


                            {/* Remaining */}
                            <div
                                className="
                            rounded-[18px]
                            border
                            border-orange-400/10
                            bg-orange-400/[0.05]
                            p-3.5
                            sm:p-4
                        "
                            >
                                <p className="text-[9px] font-medium text-orange-400 sm:text-xs">
                                    Remaining
                                </p>

                                <p
                                    className="
                                mt-1
                                text-base
                                font-bold
                                text-orange-400
                                sm:text-lg
                            "
                                >
                                    {formatCurrency(remaining)}
                                </p>
                            </div>

                        </div>


                        {/* =================================================
                    ERROR
                ================================================== */}
                        {error && (
                            <div
                                role="alert"
                                className="
                            flex
                            items-start
                            gap-3
                            rounded-[16px]
                            border
                            border-red-400/10
                            bg-red-400/[0.06]
                            px-3.5
                            py-3
                            text-xs
                            text-red-400
                        "
                            >
                                <div
                                    className="
                                mt-0.5
                                flex
                                h-5
                                w-5
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-red-400/10
                                text-[10px]
                                font-bold
                            "
                                >
                                    !
                                </div>

                                <p>{error}</p>
                            </div>
                        )}


                        {/* =================================================
                    FORM
                ================================================== */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Payment Amount */}
                            <div>

                                <label
                                    htmlFor="payment-amount"
                                    className="
                                mb-2
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                font-semibold
                                text-slate-400
                            "
                                >
                                    <IndianRupee size={14} />

                                    Payment Amount

                                    <span className="text-red-400">
                                        *
                                    </span>
                                </label>


                                <div
                                    className="
                                flex
                                overflow-hidden
                                rounded-[16px]
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                transition
                                focus-within:border-emerald-400/40
                                focus-within:bg-emerald-400/[0.02]
                            "
                                >

                                    <div
                                        className="
                                    flex
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    border-r
                                    border-white/[0.07]
                                    bg-white/[0.025]
                                    text-sm
                                    font-bold
                                    text-emerald-400
                                "
                                    >
                                        ₹
                                    </div>

                                    <input
                                        id="payment-amount"
                                        type="number"
                                        min="1"
                                        max={remaining}
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value);
                                            setError("");
                                        }}
                                        placeholder="1,000"
                                        required
                                        className="
                                    min-w-0
                                    flex-1
                                    border-0
                                    bg-transparent
                                    px-3
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    outline-none
                                    placeholder:text-slate-600
                                "
                                    />

                                </div>

                                <p className="mt-1.5 text-[10px] text-slate-600 sm:text-xs">
                                    Maximum payment:{" "}
                                    <span className="font-semibold text-slate-400">
                                        {formatCurrency(remaining)}
                                    </span>
                                </p>

                            </div>


                            {/* Date + Time */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                {/* Date */}
                                <div>

                                    <label
                                        htmlFor="payment-date"
                                        className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    font-semibold
                                    text-slate-400
                                "
                                    >
                                        <CalendarDays size={14} />
                                        Payment Date
                                    </label>

                                    <input
                                        id="payment-date"
                                        type="date"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                        className="
                                    h-11
                                    w-full
                                    rounded-[16px]
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.035]
                                    px-3
                                    text-xs
                                    text-white
                                    outline-none
                                    transition
                                    focus:border-emerald-400/40
                                    sm:text-sm
                                "
                                    />

                                </div>


                                {/* Time */}
                                <div>

                                    <label
                                        htmlFor="payment-time"
                                        className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    font-semibold
                                    text-slate-400
                                "
                                    >
                                        <Clock size={14} />
                                        Payment Time
                                    </label>

                                    <input
                                        id="payment-time"
                                        type="time"
                                        value={time}
                                        onChange={(e) =>
                                            setTime(e.target.value)
                                        }
                                        className="
                                    h-11
                                    w-full
                                    rounded-[16px]
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.035]
                                    px-3
                                    text-xs
                                    text-white
                                    outline-none
                                    transition
                                    focus:border-emerald-400/40
                                    sm:text-sm
                                "
                                    />

                                </div>

                            </div>


                            {/* Note */}
                            <div>

                                <label
                                    htmlFor="payment-note"
                                    className="
                                mb-2
                                block
                                text-xs
                                font-semibold
                                text-slate-400
                            "
                                >
                                    Payment Note
                                </label>

                                <textarea
                                    id="payment-note"
                                    rows={3}
                                    value={note}
                                    onChange={(e) =>
                                        setNote(e.target.value)
                                    }
                                    placeholder="Paid through cash, UPI, bank transfer..."
                                    className="
                                w-full
                                resize-none
                                rounded-[16px]
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                px-3.5
                                py-3
                                text-xs
                                leading-5
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-600
                                focus:border-emerald-400/40
                                sm:text-sm
                                sm:leading-6
                            "
                                />

                                <p className="mt-1.5 text-[10px] text-slate-600 sm:text-xs">
                                    Optional note about this payment.
                                </p>

                            </div>


                            {/* =================================================
                        ACTIONS
                    ================================================== */}
                            <div
                                className="
                            sticky
                            bottom-0
                            -mx-4
                            flex
                            flex-col-reverse
                            gap-2
                            border-t
                            border-white/[0.08]
                            bg-[#0b1120]/95
                            px-4
                            pb-1
                            pt-4
                            backdrop-blur-xl
                            sm:-mx-6
                            sm:flex-row
                            sm:justify-end
                            sm:px-6
                        "
                            >

                                {/* Cancel */}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="
                                h-10
                                w-full
                                rounded-full
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                px-5
                                text-xs
                                font-semibold
                                text-slate-400
                                transition
                                hover:bg-white/[0.07]
                                hover:text-white
                                active:scale-95
                                sm:w-auto
                            "
                                >
                                    Cancel
                                </button>


                                {/* Save */}
                                <button
                                    type="submit"
                                    disabled={!remaining}
                                    className="
                                flex
                                h-10
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-gradient-to-r
                                from-emerald-500
                                to-green-500
                                px-6
                                text-xs
                                font-bold
                                text-white
                                shadow-lg
                                shadow-emerald-500/20
                                transition
                                hover:from-emerald-400
                                hover:to-green-400
                                active:scale-95
                                disabled:cursor-not-allowed
                                disabled:bg-slate-700
                                disabled:from-slate-700
                                disabled:to-slate-700
                                disabled:text-slate-500
                                disabled:shadow-none
                                sm:w-auto
                            "
                                >
                                    <IndianRupee size={14} />
                                    Save Payment
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default PaymentModal;
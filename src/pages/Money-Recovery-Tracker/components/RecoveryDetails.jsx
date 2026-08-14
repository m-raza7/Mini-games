// src/pages/Money-Recovery-Tracker/components/RecoveryDetails.jsx

import {
    CalendarDays,
    Clock,
    MapPin,
    Pencil,
    Phone,
    Trash2,
    X,
} from "lucide-react";

import { useMoneyRecovery } from "../context/MoneyRecoveryContext";

import {
    getPaidAmount,
    getRemainingAmount,
    getRecoveryPercentage,
    getRecoveryStatus,
    getDueDateStatus,
} from "../utils/calculations";

import {
    formatCurrency,
    formatDate,
    formatTime,
    formatPhone,
    getInitials,
    getStatusLabel,
    getCategoryLabel,
} from "../utils/formatters";

const RecoveryDetails = ({
    recovery,
    onClose,
    onEdit,
    onPayment,
    onDelete,
}) => {
    const { deletePayment } = useMoneyRecovery();

    if (!recovery) {
        return null;
    }

    // ---------------------------------------------------------
    // Calculations
    // ---------------------------------------------------------

    const totalAmount =
        Number(recovery.amount) || 0;

    const paidAmount =
        getPaidAmount(recovery);

    const remainingAmount =
        getRemainingAmount(recovery);

    const recoveryPercentage =
        getRecoveryPercentage(recovery);

    const status =
        getRecoveryStatus(recovery);

    const statusLabel =
        getStatusLabel(status);

    const dueDateStatus =
        getDueDateStatus(recovery);

    const categoryLabel =
        getCategoryLabel(
            recovery.category
        );

    // ---------------------------------------------------------
    // Person Information
    // ---------------------------------------------------------

    const personName =
        recovery.personName?.trim() ||
        "Unknown Person";

    const phoneNumber =
        recovery.phoneNumber ||
        recovery.phone ||
        "";

    const address =
        recovery.address || "";

    const initials =
        getInitials(personName);

    // ---------------------------------------------------------
    // Payments
    // ---------------------------------------------------------

    const payments = Array.isArray(
        recovery.payments
    )
        ? [...recovery.payments].reverse()
        : [];

    // ---------------------------------------------------------
    // Delete Payment
    // ---------------------------------------------------------

    const handleDeletePayment = (
        paymentId
    ) => {
        if (!paymentId) {
            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this payment?"
            );

        if (!confirmed) {
            return;
        }

        deletePayment(
            recovery.id,
            paymentId
        );
    };

    // ---------------------------------------------------------
    // Actions
    // ---------------------------------------------------------

    const handleDeleteRecovery = () => {
        if (onDelete) {
            onDelete(recovery);
        }
    };

    const handleAddPayment = () => {
        if (onPayment) {
            onPayment(recovery);
        }
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(recovery);
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    // ---------------------------------------------------------
    // Status Colors
    // ---------------------------------------------------------

    const statusClasses = {
        completed:
            "bg-emerald-50 text-emerald-700 border border-emerald-200",

        partial:
            "bg-blue-50 text-blue-700 border border-blue-200",

        overdue:
            "bg-red-50 text-red-700 border border-red-200",

        pending:
            "bg-amber-50 text-amber-700 border border-amber-200",
    };

    const currentStatusClass =
        statusClasses[status] ||
        statusClasses.pending;

    // ---------------------------------------------------------
    // Render
    // ---------------------------------------------------------

    return (
        <div
            className="
                fixed inset-0 z-[100]
                flex items-center justify-center
                bg-slate-950/50
                backdrop-blur-sm
                p-3 sm:p-5
            "
            onMouseDown={handleClose}
        >
            {/* Modal */}

            <div
                className="
                    relative
                    flex
                    w-full
                    max-w-2xl
                    max-h-[94vh]
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-2xl
                "
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div
                    className="
        flex
        items-start
        justify-between
        gap-4
        border-b
        border-slate-200
        bg-white
        px-5
        py-4
        sm:px-6
        dark:border-slate-700
        dark:bg-slate-900
    "
                >
                    <div>
                        <h2
                            className="
                text-lg
                font-bold
                tracking-tight
                text-slate-900
                sm:text-xl
                dark:text-white
            "
                        >
                            Recovery Details
                        </h2>

                        <p
                            className="
                mt-0.5
                text-sm
                text-slate-500
                dark:text-slate-400
            "
                        >
                            Complete transaction information
                        </p>
                    </div>

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
            rounded-lg
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:border-slate-300
            hover:bg-slate-50
            hover:text-slate-900
            focus:outline-none
            focus:ring-2
            focus:ring-slate-200

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-400
            dark:hover:border-slate-600
            dark:hover:bg-slate-700
            dark:hover:text-white
            dark:focus:ring-slate-600
        "
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* =====================================================
                    SCROLLABLE CONTENT
                ====================================================== */}

                <div
                    className="
        overflow-y-auto
        overscroll-contain
        bg-slate-900
    "
                >
                    <div
                        className="
            space-y-5
            p-5
            sm:p-6
        "
                    >
                        {/* =================================================
                            PERSON HEADER
                        ================================================== */}

                        <div
                            className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        border
        border-slate-700
        bg-slate-800/60
        p-3
        shadow-sm
        sm:p-4
    "
                        >
                            {/* Avatar */}
                            <div
                                className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-slate-700
            text-sm
            font-bold
            text-slate-100
            shadow-sm
            ring-1
            ring-slate-600
            sm:h-12
            sm:w-12
        "
                            >
                                {initials}
                            </div>

                            {/* Person Information */}
                            <div
                                className="
            min-w-0
            flex-1
        "
                            >
                                <h3
                                    className="
                truncate
                text-[15px]
                font-semibold
                leading-5
                text-slate-100
                sm:text-base
            "
                                    title={personName}
                                >
                                    {personName}
                                </h3>

                                <div
                                    className="
                mt-1
                flex
                items-center
                gap-1.5
            "
                                >
                                    <span
                                        className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-slate-500
                "
                                    />

                                    <span
                                        className="
                    truncate
                    text-xs
                    font-medium
                    text-slate-400
                    sm:text-sm
                "
                                        title={categoryLabel}
                                    >
                                        {categoryLabel}
                                    </span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="shrink-0">
                                <span
                                    className={`
                inline-flex
                min-h-7
                items-center
                justify-center
                rounded-full
                border
                px-2.5
                py-1
                text-[10px]
                font-semibold
                leading-none
                sm:min-h-8
                sm:px-3
                sm:text-xs
                ${currentStatusClass}
            `}
                                >
                                    {statusLabel}
                                </span>
                            </div>
                        </div>


                        {/* =================================================
                            AMOUNT SUMMARY
                        ================================================== */}

                        <div
                            className="
        grid
        grid-cols-1
        gap-3
        sm:grid-cols-3
    "
                        >
                            {/* Total */}

                            <div
                                className="
            rounded-xl
            border
            border-slate-700
            bg-slate-800/60
            p-4
        "
                            >
                                <p
                                    className="
                text-xs
                font-medium
                text-slate-400
            "
                                >
                                    Total Given
                                </p>

                                <p
                                    className="
                mt-1
                text-lg
                font-bold
                text-slate-100
            "
                                >
                                    {formatCurrency(totalAmount)}
                                </p>
                            </div>

                            {/* Recovered */}

                            <div
                                className="
            rounded-xl
            border
            border-emerald-500/30
            bg-emerald-500/10
            p-4
        "
                            >
                                <p
                                    className="
                text-xs
                font-medium
                text-emerald-400
            "
                                >
                                    Recovered
                                </p>

                                <p
                                    className="
                mt-1
                text-lg
                font-bold
                text-emerald-400
            "
                                >
                                    {formatCurrency(paidAmount)}
                                </p>
                            </div>

                            {/* Remaining */}

                            <div
                                className="
            rounded-xl
            border
            border-orange-500/30
            bg-orange-500/10
            p-4
        "
                            >
                                <p
                                    className="
                text-xs
                font-medium
                text-orange-400
            "
                                >
                                    Remaining
                                </p>

                                <p
                                    className="
                mt-1
                text-lg
                font-bold
                text-orange-400
            "
                                >
                                    {formatCurrency(remainingAmount)}
                                </p>
                            </div>
                        </div>



                        {/* =================================================
                            RECOVERY PROGRESS
                        ================================================== */}

                        <div
                            className="
        rounded-xl
        border
        border-slate-700
        bg-slate-800/60
        p-4
    "
                        >
                            <div
                                className="
            mb-2
            flex
            items-center
            justify-between
            gap-3
        "
                            >
                                <span
                                    className="
                text-sm
                font-medium
                text-slate-300
            "
                                >
                                    Recovery Progress
                                </span>

                                <strong
                                    className="
                text-sm
                font-bold
                text-slate-100
            "
                                >
                                    {recoveryPercentage}%
                                </strong>
                            </div>

                            <div
                                className="
            h-2.5
            w-full
            overflow-hidden
            rounded-full
            bg-slate-700
        "
                            >
                                <div
                                    className="
                h-full
                rounded-full
                bg-emerald-500
                transition-all
                duration-500
            "
                                    style={{
                                        width: `${recoveryPercentage}%`,
                                    }}
                                />
                            </div>
                        </div>



                        {/* =================================================
                            INFORMATION
                        ================================================== */}

                        <div
                            className="
        overflow-hidden
        rounded-xl
        border
        border-slate-700
        bg-slate-800/60
    "
                        >
                            <div
                                className="
            border-b
            border-slate-700
            bg-slate-800
            px-4
            py-3
        "
                            >
                                <h3
                                    className="
                text-sm
                font-semibold
                text-slate-100
            "
                                >
                                    Transaction Information
                                </h3>
                            </div>

                            <div
                                className="
            grid
            grid-cols-1
            divide-y
            divide-slate-700
            sm:grid-cols-2
            sm:divide-x
            sm:divide-y-0
        "
                            >
                                {/* Phone */}

                                {phoneNumber && (
                                    <div
                                        className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                "
                                    >
                                        <div
                                            className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-700
                        text-slate-300
                    "
                                        >
                                            <Phone size={16} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400">
                                                Phone
                                            </p>

                                            <p
                                                className="
                            truncate
                            text-sm
                            font-medium
                            text-slate-100
                        "
                                            >
                                                {formatPhone(phoneNumber)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Address */}

                                {address && (
                                    <div
                                        className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                "
                                    >
                                        <div
                                            className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-700
                        text-slate-300
                    "
                                        >
                                            <MapPin size={16} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400">
                                                Address
                                            </p>

                                            <p
                                                className="
                            truncate
                            text-sm
                            font-medium
                            text-slate-100
                        "
                                            >
                                                {address}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Given Date */}

                                {recovery.givenDate && (
                                    <div
                                        className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                "
                                    >
                                        <div
                                            className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-500/10
                        text-blue-400
                    "
                                        >
                                            <CalendarDays size={16} />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Given Date
                                            </p>

                                            <p
                                                className="
                            text-sm
                            font-medium
                            text-slate-100
                        "
                                            >
                                                {formatDate(recovery.givenDate)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Given Time */}

                                {recovery.givenTime && (
                                    <div
                                        className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                "
                                    >
                                        <div
                                            className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-500/10
                        text-blue-400
                    "
                                        >
                                            <Clock size={16} />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Given Time
                                            </p>

                                            <p
                                                className="
                            text-sm
                            font-medium
                            text-slate-100
                        "
                                            >
                                                {formatTime(recovery.givenTime)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Due Date */}

                                {recovery.dueDate && (
                                    <div
                                        className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                "
                                    >
                                        <div
                                            className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-orange-500/10
                        text-orange-400
                    "
                                        >
                                            <CalendarDays size={16} />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Due Date
                                            </p>

                                            <p
                                                className="
                            text-sm
                            font-medium
                            text-slate-100
                        "
                                            >
                                                {formatDate(recovery.dueDate)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Due Time */}

                                {recovery.dueTime && (
                                    <div
                                        className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                "
                                    >
                                        <div
                                            className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-orange-500/10
                        text-orange-400
                    "
                                        >
                                            <Clock size={16} />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Due Time
                                            </p>

                                            <p
                                                className="
                            text-sm
                            font-medium
                            text-slate-100
                        "
                                            >
                                                {formatTime(recovery.dueTime)}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Due Status */}

                                {recovery.dueDate && (
                                    <div
                                        className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                "
                                    >
                                        <div
                                            className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-700
                        text-slate-300
                    "
                                        >
                                            <Clock size={16} />
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Due Status
                                            </p>

                                            <p
                                                className={`
                            text-sm
                            font-semibold
                            ${status === "overdue"
                                                        ? "text-red-400"
                                                        : status === "completed"
                                                            ? "text-emerald-400"
                                                            : "text-slate-100"
                                                    }
                        `}
                                            >
                                                {dueDateStatus}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>



                        {/* =================================================
                            NOTES
                        ================================================== */}

                        {recovery.notes?.trim() && (
                            <div
                                className="
            rounded-xl
            border
            border-slate-700
            bg-slate-800/60
            p-4
        "
                            >
                                <h3
                                    className="
                mb-1
                text-sm
                font-semibold
                text-slate-100
            "
                                >
                                    Notes
                                </h3>

                                <p
                                    className="
                whitespace-pre-wrap
                text-sm
                leading-6
                text-slate-300
            "
                                >
                                    {recovery.notes}
                                </p>
                            </div>
                        )}


                        {/* =================================================
                            PAYMENT HISTORY
                        ================================================== */}

                        <div
                            className="
        overflow-hidden
        rounded-xl
        border
        border-slate-800
        bg-slate-900
    "
                        >
                            {/* Payment Header */}

                            <div
                                className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-b
            border-slate-800
            px-4
            py-3
        "
                            >
                                <div>
                                    <h3
                                        className="
                    text-sm
                    font-semibold
                    text-slate-100
                "
                                    >
                                        Payment History
                                    </h3>

                                    <p
                                        className="
                    mt-0.5
                    text-xs
                    text-slate-400
                "
                                    >
                                        {payments.length}{" "}
                                        {payments.length === 1
                                            ? "payment"
                                            : "payments"}{" "}
                                        recorded
                                    </p>
                                </div>

                                {remainingAmount > 0 &&
                                    onPayment && (
                                        <button
                                            type="button"
                                            onClick={handleAddPayment}
                                            className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-lg
                        bg-emerald-600
                        px-3.5
                        py-2
                        text-xs
                        font-semibold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-emerald-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-emerald-500/40
                    "
                                        >
                                            Add Payment
                                        </button>
                                    )}
                            </div>

                            {/* Payment List */}

                            {payments.length > 0 ? (
                                <div
                                    className="
                divide-y
                divide-slate-800
            "
                                >
                                    {payments.map((payment, index) => {
                                        const paymentId =
                                            payment.id ||
                                            `payment-${index}`;

                                        return (
                                            <div
                                                key={paymentId}
                                                className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            px-4
                            py-3
                            transition
                            hover:bg-slate-800/60
                        "
                                            >
                                                <div className="min-w-0">
                                                    <div
                                                        className="
                                    flex
                                    items-center
                                    gap-2
                                "
                                                    >
                                                        <span
                                                            className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-emerald-500/10
                                        text-emerald-400
                                    "
                                                        >
                                                            ₹
                                                        </span>

                                                        <strong
                                                            className="
                                        text-sm
                                        font-semibold
                                        text-emerald-400
                                    "
                                                        >
                                                            {formatCurrency(
                                                                payment.amount
                                                            )}
                                                        </strong>
                                                    </div>

                                                    <div
                                                        className="
                                    mt-1
                                    flex
                                    flex-wrap
                                    gap-x-2
                                    gap-y-0.5
                                    text-xs
                                    text-slate-400
                                "
                                                    >
                                                        <span>
                                                            {payment.date
                                                                ? formatDate(
                                                                    payment.date
                                                                )
                                                                : "-"}
                                                        </span>

                                                        <span className="text-slate-600">
                                                            •
                                                        </span>

                                                        <span>
                                                            {payment.time
                                                                ? formatTime(
                                                                    payment.time
                                                                )
                                                                : "-"}
                                                        </span>
                                                    </div>

                                                    {payment.note?.trim() && (
                                                        <p
                                                            className="
                                        mt-1
                                        truncate
                                        text-xs
                                        text-slate-400
                                    "
                                                        >
                                                            {payment.note}
                                                        </p>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeletePayment(
                                                            payment.id
                                                        )
                                                    }
                                                    aria-label="Delete payment"
                                                    className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                text-slate-500
                                transition
                                hover:bg-red-500/10
                                hover:text-red-400
                                focus:outline-none
                                focus:ring-2
                                focus:ring-red-500/30
                            "
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div
                                    className="
                flex
                flex-col
                items-center
                justify-center
                px-5
                py-8
                text-center
            "
                                >
                                    <div
                                        className="
                    mb-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-800
                    text-slate-500
                "
                                    >
                                        <Clock size={20} />
                                    </div>

                                    <p
                                        className="
                    text-sm
                    font-medium
                    text-slate-300
                "
                                    >
                                        No payments recorded
                                    </p>

                                    <p
                                        className="
                    mt-1
                    text-xs
                    text-slate-500
                "
                                    >
                                        Payment history will appear here.
                                    </p>

                                    {remainingAmount > 0 &&
                                        onPayment && (
                                            <button
                                                type="button"
                                                onClick={handleAddPayment}
                                                className="
                            mt-4
                            inline-flex
                            items-center
                            justify-center
                            rounded-lg
                            bg-emerald-600
                            px-3.5
                            py-2
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-emerald-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-emerald-500/40
                        "
                                            >
                                                Record First Payment
                                            </button>
                                        )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    FOOTER ACTIONS
                ====================================================== */}

                <div
                    className="
        flex
        flex-col-reverse
        gap-2
        border-t
        border-slate-700
        bg-slate-800
        p-4
        sm:flex-row
        sm:justify-end
        sm:px-6
    "
                >
                    {onEdit && (
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-600
                bg-slate-900
                px-4
                text-sm
                font-semibold
                text-slate-200
                transition
                hover:border-slate-500
                hover:bg-slate-700
                hover:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-slate-600
            "
                        >
                            <Pencil size={16} />
                            Edit
                        </button>
                    )}

                    {onDelete && (
                        <button
                            type="button"
                            onClick={handleDeleteRecovery}
                            className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-red-600
                px-4
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-red-500
                focus:outline-none
                focus:ring-2
                focus:ring-red-500/40
            "
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecoveryDetails;
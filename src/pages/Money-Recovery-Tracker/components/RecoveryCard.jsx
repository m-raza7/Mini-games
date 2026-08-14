import {
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock,
    MoreVertical,
    Phone,
    Wallet,
} from "lucide-react";

import {
    formatCurrency,
    formatDate,
    getInitials,
} from "../utils/formatters";

export default function RecoveryCard({
    recovery,
    paid,
    remaining,
    status,
    onPayment,
    onDetails,
}) {
    const progress =
        recovery.amount > 0
            ? Math.min(
                100,
                Math.round(
                    (paid / recovery.amount) * 100
                )
            )
            : 0;

    const statusStyles = {
        pending:
            "bg-amber-50 text-amber-700 border-amber-100",

        overdue:
            "bg-red-50 text-red-700 border-red-100",

        completed:
            "bg-emerald-50 text-emerald-700 border-emerald-100",
    };

    return (
        <article
            className="
        group
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-700/60
        bg-slate-900
        p-3.5
        shadow-lg
        shadow-black/10
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-emerald-500/40
        hover:shadow-xl
        hover:shadow-black/20
        sm:p-5
    "
        >
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">

                {/* Avatar */}
                <div
                    className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-emerald-500/15
                text-xs
                font-bold
                text-emerald-400
                ring-4
                ring-emerald-500/5
                sm:h-12
                sm:w-12
                sm:text-sm
            "
                >
                    {getInitials(recovery.personName)}
                </div>

                {/* Main Content */}
                <div className="min-w-0 flex-1">

                    {/* Header */}
                    <div
                        className="
                    flex
                    min-w-0
                    items-start
                    justify-between
                    gap-2
                    sm:gap-4
                "
                    >
                        <div className="min-w-0 flex-1">

                            <h3
                                className="
                            truncate
                            text-sm
                            font-semibold
                            leading-5
                            text-white
                            sm:text-lg
                        "
                            >
                                {recovery.personName}
                            </h3>

                            {recovery.phone && (
                                <div
                                    className="
                                mt-1
                                flex
                                min-w-0
                                items-center
                                gap-1.5
                                text-[11px]
                                text-slate-400
                                sm:text-xs
                            "
                                >
                                    <Phone
                                        size={12}
                                        className="shrink-0"
                                    />

                                    <span className="truncate">
                                        {recovery.phone}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <span
                            className={`
                        inline-flex
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        px-2
                        py-1
                        text-[10px]
                        font-semibold
                        capitalize
                        leading-none
                        sm:px-2.5
                        sm:py-1
                        sm:text-xs
                        ${statusStyles[status]}
                    `}
                        >
                            {status}
                        </span>
                    </div>

                    {/* Amount Summary */}
                    <div
                        className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-2
                    sm:grid-cols-4
                    sm:gap-3
                "
                    >
                        {/* Given */}
                        <div
                            className="
                        min-w-0
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-800/70
                        p-2.5
                        sm:p-3
                    "
                        >
                            <p
                                className="
                            text-[10px]
                            font-medium
                            text-slate-400
                            sm:text-xs
                        "
                            >
                                Given
                            </p>

                            <p
                                className="
                            mt-1
                            truncate
                            text-sm
                            font-bold
                            text-white
                            sm:text-base
                        "
                            >
                                {formatCurrency(recovery.amount)}
                            </p>
                        </div>

                        {/* Recovered */}
                        <div
                            className="
                        min-w-0
                        rounded-xl
                        border
                        border-emerald-500/20
                        bg-emerald-500/10
                        p-2.5
                        sm:p-3
                    "
                        >
                            <p
                                className="
                            text-[10px]
                            font-medium
                            text-emerald-400
                            sm:text-xs
                        "
                            >
                                Recovered
                            </p>

                            <p
                                className="
                            mt-1
                            truncate
                            text-sm
                            font-bold
                            text-emerald-400
                            sm:text-base
                        "
                            >
                                {formatCurrency(paid)}
                            </p>
                        </div>

                        {/* Remaining */}
                        <div
                            className="
                        min-w-0
                        rounded-xl
                        border
                        border-orange-500/20
                        bg-orange-500/10
                        p-2.5
                        sm:p-3
                    "
                        >
                            <p
                                className="
                            text-[10px]
                            font-medium
                            text-orange-400
                            sm:text-xs
                        "
                            >
                                Remaining
                            </p>

                            <p
                                className="
                            mt-1
                            truncate
                            text-sm
                            font-bold
                            text-orange-400
                            sm:text-base
                        "
                            >
                                {formatCurrency(remaining)}
                            </p>
                        </div>

                        {/* Due Date */}
                        <div
                            className="
                        min-w-0
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-800/70
                        p-2.5
                        sm:p-3
                    "
                        >
                            <p
                                className="
                            text-[10px]
                            font-medium
                            text-slate-400
                            sm:text-xs
                        "
                            >
                                Due Date
                            </p>

                            <p
                                className="
                            mt-1
                            truncate
                            text-sm
                            font-semibold
                            text-slate-200
                            sm:text-base
                        "
                                title={formatDate(recovery.dueDate)}
                            >
                                {formatDate(recovery.dueDate)}
                            </p>
                        </div>
                    </div>

                    {/* Recovery Progress */}
                    <div className="mt-4">
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                            <span
                                className="
                            text-[11px]
                            font-medium
                            text-slate-400
                            sm:text-xs
                        "
                            >
                                Recovery Progress
                            </span>

                            <span
                                className="
                            shrink-0
                            text-[11px]
                            font-bold
                            text-emerald-400
                            sm:text-xs
                        "
                            >
                                {progress}%
                            </span>
                        </div>

                        <div
                            className="
                        h-2
                        w-full
                        overflow-hidden
                        rounded-full
                        bg-slate-800
                        sm:h-2.5
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
                                    width: `${progress}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div
                        className="
                    mt-4
                    flex
                    flex-wrap
                    items-center
                    gap-x-3
                    gap-y-2
                    text-[11px]
                    text-slate-400
                    sm:text-xs
                "
                    >
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays
                                size={13}
                                className="shrink-0 text-slate-500"
                            />

                            <span>
                                Given {formatDate(recovery.givenDate)}
                            </span>
                        </span>

                        {recovery.dueTime && (
                            <span className="inline-flex items-center gap-1.5">
                                <Clock
                                    size={13}
                                    className="shrink-0 text-slate-500"
                                />

                                <span>
                                    {recovery.dueTime}
                                </span>
                            </span>
                        )}

                        <span
                            className="
                        rounded-lg
                        bg-slate-800
                        px-2
                        py-1
                        font-medium
                        text-slate-300
                    "
                        >
                            {recovery.category}
                        </span>
                    </div>

                    {/* Actions */}
                    <div
                        className="
                    mt-4
                    grid
                    w-full
                    min-w-0
                    grid-cols-2
                    gap-2
                    sm:gap-3
                "
                    >
                        {/* Add Payment */}
                        {remaining > 0 ? (
                            <button
                                type="button"
                                onClick={() => onPayment(recovery)}
                                className="
                            flex
                            min-h-[42px]
                            min-w-0
                            w-full
                            items-center
                            justify-center
                            gap-1.5
                            overflow-hidden
                            rounded-xl
                            bg-emerald-600
                            px-2
                            py-2
                            text-[11px]
                            font-semibold
                            text-white
                            shadow-sm
                            shadow-emerald-900/20
                            transition-all
                            duration-200
                            hover:bg-emerald-500
                            active:scale-[0.98]
                            focus:outline-none
                            focus:ring-2
                            focus:ring-emerald-500
                            focus:ring-offset-2
                            focus:ring-offset-slate-900
                            sm:min-h-[44px]
                            sm:gap-2
                            sm:px-3
                            sm:text-sm
                        "
                            >
                                <Wallet
                                    size={15}
                                    strokeWidth={2}
                                    className="shrink-0"
                                />

                                <span className="truncate">
                                    Add Payment
                                </span>
                            </button>
                        ) : (
                            <div
                                className="
                            flex
                            min-h-[42px]
                            min-w-0
                            w-full
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-xl
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            px-2
                            text-[11px]
                            font-semibold
                            text-emerald-400
                            sm:min-h-[44px]
                            sm:text-sm
                        "
                            >
                                <span className="truncate">
                                    Fully Recovered
                                </span>
                            </div>
                        )}

                        {/* Details */}
                        <button
                            type="button"
                            onClick={() => onDetails(recovery)}
                            className="
                        flex
                        min-h-[42px]
                        min-w-0
                        w-full
                        items-center
                        justify-center
                        gap-1
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800/70
                        px-2
                        py-2
                        text-[11px]
                        font-semibold
                        text-slate-300
                        shadow-sm
                        transition-all
                        duration-200
                        hover:border-emerald-500/30
                        hover:bg-emerald-500/10
                        hover:text-emerald-400
                        active:scale-[0.98]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-emerald-500
                        focus:ring-offset-2
                        focus:ring-offset-slate-900
                        sm:min-h-[44px]
                        sm:gap-1.5
                        sm:px-3
                        sm:text-sm
                    "
                        >
                            <span className="truncate">
                                Details
                            </span>

                            <ChevronRight
                                size={15}
                                strokeWidth={2}
                                className="shrink-0"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
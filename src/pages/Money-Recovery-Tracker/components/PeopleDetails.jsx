import { useEffect, useMemo } from "react";

import {
    X,
    Phone,
    MapPin,
    CalendarDays,
    Clock,
    Wallet,
    CreditCard,
    ChevronRight,
    CheckCircle2,
    AlertTriangle,
    CircleDollarSign,
    UserRound,
    FileText,
    ArrowDownLeft,
} from "lucide-react";

import {
    getPaidAmount,
    getRemainingAmount,
} from "../utils/calculations";

import {
    formatCurrency,
    formatDate,
    getInitials,
} from "../utils/formatters";

export default function PeopleDetails({
    person,
    recoveries = [],
    onClose,
    onPayment,
    onDetails,
}) {
    if (!person) return null;

    /*
    |--------------------------------------------------------------------------
    | Get all recoveries belonging to this person
    |--------------------------------------------------------------------------
    */

    const personRecoveries = useMemo(() => {
        const personPhone = String(person.phone || "").trim();

        const personName = String(
            person.name || person.personName || ""
        )
            .trim()
            .toLowerCase();

        return recoveries.filter((recovery) => {
            const recoveryPhone = String(
                recovery.phone || ""
            ).trim();

            const recoveryName = String(
                recovery.personName || ""
            )
                .trim()
                .toLowerCase();

            /*
             * Phone is the strongest identifier.
             */
            if (
                personPhone &&
                recoveryPhone
            ) {
                return personPhone === recoveryPhone;
            }

            /*
             * Fallback to name.
             */
            return (
                personName &&
                recoveryName === personName
            );
        });
    }, [person, recoveries]);

    /*
    |--------------------------------------------------------------------------
    | Calculate totals
    |--------------------------------------------------------------------------
    */

    const totalGiven = useMemo(() => {
        return personRecoveries.reduce(
            (total, recovery) =>
                total +
                Number(recovery.amount || 0),
            0
        );
    }, [personRecoveries]);

    const totalRecovered = useMemo(() => {
        return personRecoveries.reduce(
            (total, recovery) =>
                total + getPaidAmount(recovery),
            0
        );
    }, [personRecoveries]);

    const totalRemaining = Math.max(
        0,
        totalGiven - totalRecovered
    );

    const progress =
        totalGiven > 0
            ? Math.min(
                100,
                Math.round(
                    (totalRecovered /
                        totalGiven) *
                    100
                )
            )
            : 0;

    /*
    |--------------------------------------------------------------------------
    | Overall status
    |--------------------------------------------------------------------------
    */

    const overdueAmount = useMemo(() => {
        return personRecoveries.reduce(
            (total, recovery) => {
                const remaining =
                    getRemainingAmount(
                        recovery
                    );

                if (
                    remaining <= 0 ||
                    !recovery.dueDate
                ) {
                    return total;
                }

                const dueDate = new Date(
                    recovery.dueDate
                );

                const now = new Date();

                dueDate.setHours(
                    23,
                    59,
                    59,
                    999
                );

                if (dueDate < now) {
                    return total + remaining;
                }

                return total;
            },
            0
        );
    }, [personRecoveries]);

    const overallStatus =
        totalRemaining <= 0
            ? "completed"
            : overdueAmount > 0
                ? "overdue"
                : "partial";

    /*
    |--------------------------------------------------------------------------
    | Status styles
    |--------------------------------------------------------------------------
    */

    const statusStyles = {
        completed:
            "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",

        overdue:
            "border-red-500/25 bg-red-500/10 text-red-400",

        partial:
            "border-blue-500/25 bg-blue-500/10 text-blue-400",

        pending:
            "border-amber-500/25 bg-amber-500/10 text-amber-400",
    };

    /*
    |--------------------------------------------------------------------------
    | ESC key
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [onClose]);

    /*
    |--------------------------------------------------------------------------
    | Prevent background scroll
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                originalOverflow;
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Format time safely
    |--------------------------------------------------------------------------
    */

    const formatTime = (time) => {
        if (!time) return "-";

        try {
            const [hours, minutes] =
                String(time).split(":");

            if (
                hours === undefined ||
                minutes === undefined
            ) {
                return time;
            }

            const date = new Date();

            date.setHours(
                Number(hours),
                Number(minutes),
                0,
                0
            );

            return date.toLocaleTimeString(
                undefined,
                {
                    hour: "numeric",
                    minute: "2-digit",
                }
            );
        } catch {
            return time;
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Recovery status
    |--------------------------------------------------------------------------
    */

    const getRecoveryStatus = (recovery) => {
        const remaining =
            getRemainingAmount(recovery);

        if (remaining <= 0) {
            return "completed";
        }

        if (!recovery.dueDate) {
            return "partial";
        }

        const dueDate = new Date(
            recovery.dueDate
        );

        const now = new Date();

        dueDate.setHours(
            23,
            59,
            59,
            999
        );

        if (dueDate < now) {
            return "overdue";
        }

        return getPaidAmount(recovery) > 0
            ? "partial"
            : "pending";
    };

    /*
    |--------------------------------------------------------------------------
    | Handle outside click
    |--------------------------------------------------------------------------
    */

    const handleBackdropClick = (
        event
    ) => {
        if (
            event.target ===
            event.currentTarget
        ) {
            onClose?.();
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/70
                p-2
                backdrop-blur-md
                sm:p-4
            "
            onMouseDown={
                handleBackdropClick
            }
            role="dialog"
            aria-modal="true"
            aria-label="Person details"
        >
            <div
                className="
                    relative
                    flex
                    h-full
                    max-h-[96vh]
                    w-full
                    max-w-4xl
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-700/70
                    bg-slate-950
                    shadow-2xl
                    shadow-black/50
                    sm:h-auto
                    sm:max-h-[94vh]
                    sm:rounded-3xl
                "
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                {/* =========================================================
                    HEADER
                ========================================================== */}

                <div
                    className="
                        shrink-0
                        border-b
                        border-slate-800
                        bg-slate-950/95
                        px-4
                        py-4
                        backdrop-blur-xl
                        sm:px-6
                        sm:py-5
                    "
                >
                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-4
                        "
                    >
                        {/* Person */}
                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-3
                                sm:gap-4
                            "
                        >
                            {/* Avatar */}

                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-emerald-400/20
                                    bg-emerald-500/10
                                    text-sm
                                    font-bold
                                    text-emerald-400
                                    ring-4
                                    ring-emerald-500/5
                                    sm:h-14
                                    sm:w-14
                                    sm:text-base
                                "
                            >
                                {getInitials(
                                    person.name ||
                                    person.personName
                                )}
                            </div>

                            {/* Name */}

                            <div className="min-w-0">
                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-2
                                    "
                                >
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
                                        {person.name ||
                                            person.personName}
                                    </h2>

                                    <span
                                        className={`
                                            rounded-full
                                            border
                                            px-2
                                            py-0.5
                                            text-[10px]
                                            font-semibold
                                            capitalize
                                            sm:text-xs
                                            ${statusStyles[
                                            overallStatus
                                            ]}
                                        `}
                                    >
                                        {
                                            overallStatus
                                        }
                                    </span>
                                </div>

                                {person.phone && (
                                    <div
                                        className="
                                            mt-1
                                            flex
                                            items-center
                                            gap-1.5
                                            text-xs
                                            text-slate-500
                                            sm:text-sm
                                        "
                                    >
                                        <Phone
                                            size={13}
                                            className="shrink-0"
                                        />

                                        <span>
                                            {
                                                person.phone
                                            }
                                        </span>
                                    </div>
                                )}

                                <p
                                    className="
                                        mt-1
                                        text-[10px]
                                        text-slate-600
                                        sm:text-xs
                                    "
                                >
                                    {
                                        personRecoveries.length
                                    }{" "}
                                    {personRecoveries.length ===
                                        1
                                        ? "recovery"
                                        : "recoveries"}{" "}
                                    recorded
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
                                rounded-xl
                                border
                                border-slate-700
                                bg-slate-900
                                text-slate-400
                                transition-all
                                hover:border-slate-600
                                hover:bg-slate-800
                                hover:text-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-emerald-500/50
                                sm:h-10
                                sm:w-10
                            "
                        >
                            <X size={19} />
                        </button>
                    </div>
                </div>

                {/* =========================================================
                    CONTENT
                ========================================================== */}

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
                            space-y-4
                            p-4
                            sm:space-y-5
                            sm:p-6
                        "
                    >
                        {/* =================================================
                            SUMMARY
                        ================================================== */}

                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-2
                                sm:grid-cols-4
                                sm:gap-3
                            "
                        >
                            {/* Total */}

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-900/80
                                    p-3
                                    sm:p-4
                                "
                            >
                                <div
                                    className="
                                        mb-2
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-blue-500/10
                                        text-blue-400
                                    "
                                >
                                    <CircleDollarSign
                                        size={16}
                                    />
                                </div>

                                <p
                                    className="
                                        text-[10px]
                                        font-medium
                                        text-slate-500
                                        sm:text-xs
                                    "
                                >
                                    Total Given
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-bold
                                        text-white
                                        sm:text-base
                                    "
                                >
                                    {formatCurrency(
                                        totalGiven
                                    )}
                                </p>
                            </div>

                            {/* Recovered */}

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-emerald-500/15
                                    bg-emerald-500/[0.06]
                                    p-3
                                    sm:p-4
                                "
                            >
                                <div
                                    className="
                                        mb-2
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-emerald-500/10
                                        text-emerald-400
                                    "
                                >
                                    <CheckCircle2
                                        size={16}
                                    />
                                </div>

                                <p
                                    className="
                                        text-[10px]
                                        font-medium
                                        text-emerald-500/70
                                        sm:text-xs
                                    "
                                >
                                    Recovered
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-bold
                                        text-emerald-400
                                        sm:text-base
                                    "
                                >
                                    {formatCurrency(
                                        totalRecovered
                                    )}
                                </p>
                            </div>

                            {/* Remaining */}

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-orange-500/15
                                    bg-orange-500/[0.06]
                                    p-3
                                    sm:p-4
                                "
                            >
                                <div
                                    className="
                                        mb-2
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-orange-500/10
                                        text-orange-400
                                    "
                                >
                                    <Wallet
                                        size={16}
                                    />
                                </div>

                                <p
                                    className="
                                        text-[10px]
                                        font-medium
                                        text-orange-500/70
                                        sm:text-xs
                                    "
                                >
                                    Remaining
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-bold
                                        text-orange-400
                                        sm:text-base
                                    "
                                >
                                    {formatCurrency(
                                        totalRemaining
                                    )}
                                </p>
                            </div>

                            {/* Overdue */}

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-red-500/15
                                    bg-red-500/[0.06]
                                    p-3
                                    sm:p-4
                                "
                            >
                                <div
                                    className="
                                        mb-2
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-red-500/10
                                        text-red-400
                                    "
                                >
                                    <AlertTriangle
                                        size={16}
                                    />
                                </div>

                                <p
                                    className="
                                        text-[10px]
                                        font-medium
                                        text-red-500/70
                                        sm:text-xs
                                    "
                                >
                                    Overdue
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-bold
                                        text-red-400
                                        sm:text-base
                                    "
                                >
                                    {formatCurrency(
                                        overdueAmount
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* =================================================
                            PROGRESS
                        ================================================== */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-900/70
                                p-4
                                sm:p-5
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
                                <div>
                                    <p
                                        className="
                                            text-xs
                                            font-semibold
                                            text-slate-300
                                            sm:text-sm
                                        "
                                    >
                                        Overall Recovery
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            text-[10px]
                                            text-slate-600
                                            sm:text-xs
                                        "
                                    >
                                        Total recovered
                                        from all
                                        transactions
                                    </p>
                                </div>

                                <strong
                                    className="
                                        text-sm
                                        font-bold
                                        text-emerald-400
                                        sm:text-base
                                    "
                                >
                                    {progress}%
                                </strong>
                            </div>

                            <div
                                className="
                                    h-2.5
                                    overflow-hidden
                                    rounded-full
                                    bg-slate-800
                                "
                            >
                                <div
                                    className="
                                        h-full
                                        rounded-full
                                        bg-gradient-to-r
                                        from-emerald-600
                                        to-emerald-400
                                        transition-all
                                        duration-700
                                    "
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>

                            <div
                                className="
                                    mt-2
                                    flex
                                    justify-between
                                    text-[10px]
                                    text-slate-600
                                    sm:text-xs
                                "
                            >
                                <span>
                                    {formatCurrency(
                                        totalRecovered
                                    )}{" "}
                                    recovered
                                </span>

                                <span>
                                    {formatCurrency(
                                        totalRemaining
                                    )}{" "}
                                    remaining
                                </span>
                            </div>
                        </div>

                        {/* =================================================
                            CONTACT INFORMATION
                        ================================================== */}

                        {(person.phone ||
                            person.address) && (
                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-slate-800
                                        bg-slate-900/70
                                        p-4
                                        sm:p-5
                                    "
                                >
                                    <div
                                        className="
                                            mb-3
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >
                                        <UserRound
                                            size={16}
                                            className="text-emerald-400"
                                        />

                                        <h3
                                            className="
                                                text-sm
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            Contact
                                            Information
                                        </h3>
                                    </div>

                                    <div
                                        className="
                                            grid
                                            grid-cols-1
                                            gap-2
                                            sm:grid-cols-2
                                        "
                                    >
                                        {person.phone && (
                                            <div
                                                className="
                                                    flex
                                                    min-w-0
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    border
                                                    border-slate-800
                                                    bg-slate-950/50
                                                    p-3
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
                                                        bg-slate-800
                                                        text-slate-400
                                                    "
                                                >
                                                    <Phone
                                                        size={
                                                            15
                                                        }
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-[10px] text-slate-600">
                                                        Phone
                                                    </p>

                                                    <p className="truncate text-xs font-medium text-slate-300 sm:text-sm">
                                                        {
                                                            person.phone
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {person.address && (
                                            <div
                                                className="
                                                    flex
                                                    min-w-0
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    border
                                                    border-slate-800
                                                    bg-slate-950/50
                                                    p-3
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
                                                        bg-slate-800
                                                        text-slate-400
                                                    "
                                                >
                                                    <MapPin
                                                        size={
                                                            15
                                                        }
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-[10px] text-slate-600">
                                                        Address
                                                    </p>

                                                    <p className="truncate text-xs font-medium text-slate-300 sm:text-sm">
                                                        {
                                                            person.address
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        {/* =================================================
                            RECOVERY RECORDS
                        ================================================== */}

                        <div>
                            <div
                                className="
                                    mb-3
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >
                                <div>
                                    <h3
                                        className="
                                            text-sm
                                            font-bold
                                            text-white
                                            sm:text-base
                                        "
                                    >
                                        Recovery Records
                                    </h3>

                                    <p
                                        className="
                                            mt-0.5
                                            text-[10px]
                                            text-slate-600
                                            sm:text-xs
                                        "
                                    >
                                        All transactions
                                        for this person
                                    </p>
                                </div>

                                <span
                                    className="
                                        rounded-full
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        font-semibold
                                        text-slate-500
                                        sm:text-xs
                                    "
                                >
                                    {
                                        personRecoveries.length
                                    }{" "}
                                    total
                                </span>
                            </div>

                            {personRecoveries.length ===
                                0 ? (
                                <div
                                    className="
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-dashed
                                        border-slate-800
                                        bg-slate-900/40
                                        px-5
                                        py-10
                                        text-center
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-slate-800
                                            text-slate-600
                                        "
                                    >
                                        <Wallet
                                            size={21}
                                        />
                                    </div>

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            font-semibold
                                            text-slate-400
                                        "
                                    >
                                        No recovery
                                        records
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-slate-600
                                        "
                                    >
                                        No transactions
                                        were found for
                                        this person.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {personRecoveries.map(
                                        (
                                            recovery,
                                            index
                                        ) => {
                                            const paid =
                                                getPaidAmount(
                                                    recovery
                                                );

                                            const remaining =
                                                Math.max(
                                                    0,
                                                    Number(
                                                        recovery.amount ||
                                                        0
                                                    ) -
                                                    paid
                                                );

                                            const recoveryProgress =
                                                Number(
                                                    recovery.amount ||
                                                    0
                                                ) > 0
                                                    ? Math.min(
                                                        100,
                                                        Math.round(
                                                            (paid /
                                                                Number(
                                                                    recovery.amount
                                                                )) *
                                                            100
                                                        )
                                                    )
                                                    : 0;

                                            const recoveryStatus =
                                                getRecoveryStatus(
                                                    recovery
                                                );

                                            const payments =
                                                Array.isArray(
                                                    recovery.payments
                                                )
                                                    ? recovery.payments
                                                    : [];

                                            return (
                                                <div
                                                    key={
                                                        recovery.id ||
                                                        `recovery-${index}`
                                                    }
                                                    className="
                                                        overflow-hidden
                                                        rounded-2xl
                                                        border
                                                        border-slate-800
                                                        bg-slate-900/70
                                                        transition-all
                                                        hover:border-slate-700
                                                    "
                                                >
                                                    {/* Record Header */}

                                                    <div
                                                        className="
                                                            flex
                                                            items-start
                                                            justify-between
                                                            gap-3
                                                            border-b
                                                            border-slate-800
                                                            px-4
                                                            py-3
                                                            sm:px-5
                                                        "
                                                    >
                                                        <div className="min-w-0">
                                                            <div
                                                                className="
                                                                    flex
                                                                    flex-wrap
                                                                    items-center
                                                                    gap-2
                                                                "
                                                            >
                                                                <span
                                                                    className="
                                                                        rounded-lg
                                                                        bg-slate-800
                                                                        px-2
                                                                        py-1
                                                                        text-[10px]
                                                                        font-semibold
                                                                        text-slate-400
                                                                    "
                                                                >
                                                                    #
                                                                    {index +
                                                                        1}
                                                                </span>

                                                                {recovery.category && (
                                                                    <span
                                                                        className="
                                                                            rounded-lg
                                                                            bg-emerald-500/10
                                                                            px-2
                                                                            py-1
                                                                            text-[10px]
                                                                            font-medium
                                                                            text-emerald-400
                                                                        "
                                                                    >
                                                                        {
                                                                            recovery.category
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <p
                                                                className="
                                                                    mt-2
                                                                    text-sm
                                                                    font-bold
                                                                    text-white
                                                                    sm:text-base
                                                                "
                                                            >
                                                                {formatCurrency(
                                                                    recovery.amount
                                                                )}
                                                            </p>
                                                        </div>

                                                        <span
                                                            className={`
                                                                shrink-0
                                                                rounded-full
                                                                border
                                                                px-2.5
                                                                py-1
                                                                text-[10px]
                                                                font-semibold
                                                                capitalize
                                                                sm:text-xs
                                                                ${statusStyles[
                                                                recoveryStatus
                                                                ]}
                                                            `}
                                                        >
                                                            {
                                                                recoveryStatus
                                                            }
                                                        </span>
                                                    </div>

                                                    {/* Amounts */}

                                                    <div
                                                        className="
                                                            grid
                                                            grid-cols-3
                                                            divide-x
                                                            divide-slate-800
                                                        "
                                                    >
                                                        <div className="p-3 sm:p-4">
                                                            <p className="text-[10px] text-slate-600">
                                                                Given
                                                            </p>

                                                            <p className="mt-1 text-xs font-bold text-slate-200 sm:text-sm">
                                                                {formatCurrency(
                                                                    recovery.amount
                                                                )}
                                                            </p>
                                                        </div>

                                                        <div className="p-3 sm:p-4">
                                                            <p className="text-[10px] text-slate-600">
                                                                Recovered
                                                            </p>

                                                            <p className="mt-1 text-xs font-bold text-emerald-400 sm:text-sm">
                                                                {formatCurrency(
                                                                    paid
                                                                )}
                                                            </p>
                                                        </div>

                                                        <div className="p-3 sm:p-4">
                                                            <p className="text-[10px] text-slate-600">
                                                                Remaining
                                                            </p>

                                                            <p className="mt-1 text-xs font-bold text-orange-400 sm:text-sm">
                                                                {formatCurrency(
                                                                    remaining
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Progress */}

                                                    <div className="px-4 pt-1 sm:px-5">
                                                        <div
                                                            className="
                                                                mb-1.5
                                                                flex
                                                                items-center
                                                                justify-between
                                                            "
                                                        >
                                                            <span className="text-[10px] text-slate-600">
                                                                Recovery
                                                                Progress
                                                            </span>

                                                            <span className="text-[10px] font-semibold text-emerald-400">
                                                                {
                                                                    recoveryProgress
                                                                }
                                                                %
                                                            </span>
                                                        </div>

                                                        <div
                                                            className="
                                                                h-1.5
                                                                overflow-hidden
                                                                rounded-full
                                                                bg-slate-800
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
                                                                    width: `${recoveryProgress}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Dates */}

                                                    <div
                                                        className="
                                                            grid
                                                            grid-cols-1
                                                            gap-2
                                                            px-4
                                                            py-4
                                                            sm:grid-cols-2
                                                            sm:px-5
                                                        "
                                                    >
                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2.5
                                                                rounded-xl
                                                                bg-slate-950/50
                                                                p-2.5
                                                            "
                                                        >
                                                            <CalendarDays
                                                                size={
                                                                    14
                                                                }
                                                                className="shrink-0 text-slate-600"
                                                            />

                                                            <div className="min-w-0">
                                                                <p className="text-[10px] text-slate-600">
                                                                    Given
                                                                </p>

                                                                <p className="text-xs font-medium text-slate-400">
                                                                    {recovery.givenDate
                                                                        ? formatDate(
                                                                            recovery.givenDate
                                                                        )
                                                                        : "-"}
                                                                    {recovery.givenTime
                                                                        ? ` • ${formatTime(
                                                                            recovery.givenTime
                                                                        )}`
                                                                        : ""}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2.5
                                                                rounded-xl
                                                                bg-slate-950/50
                                                                p-2.5
                                                            "
                                                        >
                                                            <Clock
                                                                size={
                                                                    14
                                                                }
                                                                className="shrink-0 text-slate-600"
                                                            />

                                                            <div className="min-w-0">
                                                                <p className="text-[10px] text-slate-600">
                                                                    Due
                                                                </p>

                                                                <p className="text-xs font-medium text-slate-400">
                                                                    {recovery.dueDate
                                                                        ? formatDate(
                                                                            recovery.dueDate
                                                                        )
                                                                        : "-"}
                                                                    {recovery.dueTime
                                                                        ? ` • ${formatTime(
                                                                            recovery.dueTime
                                                                        )}`
                                                                        : ""}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Notes */}

                                                    {recovery.notes?.trim() && (
                                                        <div
                                                            className="
                                                                mx-4
                                                                mb-4
                                                                rounded-xl
                                                                border
                                                                border-slate-800
                                                                bg-slate-950/50
                                                                p-3
                                                                sm:mx-5
                                                            "
                                                        >
                                                            <div
                                                                className="
                                                                    mb-1.5
                                                                    flex
                                                                    items-center
                                                                    gap-1.5
                                                                "
                                                            >
                                                                <FileText
                                                                    size={
                                                                        13
                                                                    }
                                                                    className="text-slate-600"
                                                                />

                                                                <span className="text-[10px] font-semibold text-slate-500">
                                                                    Notes
                                                                </span>
                                                            </div>

                                                            <p
                                                                className="
                                                                    whitespace-pre-wrap
                                                                    text-xs
                                                                    leading-5
                                                                    text-slate-500
                                                                "
                                                            >
                                                                {
                                                                    recovery.notes
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Payments */}

                                                    {payments.length >
                                                        0 && (
                                                            <div
                                                                className="
                                                                    border-t
                                                                    border-slate-800
                                                                    px-4
                                                                    py-4
                                                                    sm:px-5
                                                                "
                                                            >
                                                                <div
                                                                    className="
                                                                        mb-3
                                                                        flex
                                                                        items-center
                                                                        justify-between
                                                                    "
                                                                >
                                                                    <div
                                                                        className="
                                                                            flex
                                                                            items-center
                                                                            gap-2
                                                                        "
                                                                    >
                                                                        <CreditCard
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="text-emerald-400"
                                                                        />

                                                                        <span className="text-xs font-semibold text-slate-300">
                                                                            Payment
                                                                            History
                                                                        </span>
                                                                    </div>

                                                                    <span className="text-[10px] text-slate-600">
                                                                        {
                                                                            payments.length
                                                                        }{" "}
                                                                        {payments.length ===
                                                                            1
                                                                            ? "payment"
                                                                            : "payments"}
                                                                    </span>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    {payments.map(
                                                                        (
                                                                            payment,
                                                                            paymentIndex
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    payment.id ||
                                                                                    `payment-${paymentIndex}`
                                                                                }
                                                                                className="
                                                                                    flex
                                                                                    items-center
                                                                                    justify-between
                                                                                    gap-3
                                                                                    rounded-xl
                                                                                    border
                                                                                    border-slate-800
                                                                                    bg-slate-950/50
                                                                                    p-2.5
                                                                                "
                                                                            >
                                                                                <div
                                                                                    className="
                                                                                        flex
                                                                                        min-w-0
                                                                                        items-center
                                                                                        gap-2.5
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
                                                                                            rounded-full
                                                                                            bg-emerald-500/10
                                                                                            text-emerald-400
                                                                                        "
                                                                                    >
                                                                                        <ArrowDownLeft
                                                                                            size={
                                                                                                14
                                                                                            }
                                                                                        />
                                                                                    </div>

                                                                                    <div className="min-w-0">
                                                                                        <p className="text-xs font-semibold text-emerald-400">
                                                                                            {formatCurrency(
                                                                                                payment.amount
                                                                                            )}
                                                                                        </p>

                                                                                        <p className="mt-0.5 truncate text-[10px] text-slate-600">
                                                                                            {payment.date
                                                                                                ? formatDate(
                                                                                                    payment.date
                                                                                                )
                                                                                                : "-"}
                                                                                            {payment.time
                                                                                                ? ` • ${formatTime(
                                                                                                    payment.time
                                                                                                )}`
                                                                                                : ""}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>

                                                                                {payment.note?.trim() && (
                                                                                    <p className="hidden max-w-[40%] truncate text-[10px] text-slate-600 sm:block">
                                                                                        {
                                                                                            payment.note
                                                                                        }
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                    {/* Actions */}

                                                    <div
                                                        className="
                                                            flex
                                                            flex-col-reverse
                                                            gap-2
                                                            border-t
                                                            border-slate-800
                                                            bg-slate-950/40
                                                            p-3
                                                            sm:flex-row
                                                            sm:justify-end
                                                            sm:px-5
                                                        "
                                                    >
                                                        {remaining >
                                                            0 &&
                                                            onPayment && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        onPayment(
                                                                            recovery
                                                                        )
                                                                    }
                                                                    className="
                                                                        inline-flex
                                                                        min-h-[40px]
                                                                        items-center
                                                                        justify-center
                                                                        gap-2
                                                                        rounded-xl
                                                                        bg-emerald-600
                                                                        px-4
                                                                        text-xs
                                                                        font-semibold
                                                                        text-white
                                                                        shadow-lg
                                                                        shadow-emerald-950/20
                                                                        transition-all
                                                                        hover:bg-emerald-500
                                                                        active:scale-[0.98]
                                                                        focus:outline-none
                                                                        focus:ring-2
                                                                        focus:ring-emerald-500/50
                                                                    "
                                                                >
                                                                    <Wallet
                                                                        size={
                                                                            15
                                                                        }
                                                                    />

                                                                    Add
                                                                    Payment
                                                                </button>
                                                            )}

                                                        {onDetails && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onDetails(
                                                                        recovery
                                                                    )
                                                                }
                                                                className="
                                                                    inline-flex
                                                                    min-h-[40px]
                                                                    items-center
                                                                    justify-center
                                                                    gap-1.5
                                                                    rounded-xl
                                                                    border
                                                                    border-slate-700
                                                                    bg-slate-900
                                                                    px-4
                                                                    text-xs
                                                                    font-semibold
                                                                    text-slate-300
                                                                    transition-all
                                                                    hover:border-emerald-500/30
                                                                    hover:bg-emerald-500/10
                                                                    hover:text-emerald-400
                                                                    active:scale-[0.98]
                                                                    focus:outline-none
                                                                    focus:ring-2
                                                                    focus:ring-emerald-500/50
                                                                "
                                                            >
                                                                Details

                                                                <ChevronRight
                                                                    size={
                                                                        15
                                                                    }
                                                                />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    FOOTER
                ========================================================== */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-between
                        gap-3
                        border-t
                        border-slate-800
                        bg-slate-950
                        px-4
                        py-3
                        sm:px-6
                    "
                >
                    <div className="min-w-0">
                        <p className="text-[10px] text-slate-600 sm:text-xs">
                            Outstanding amount
                        </p>

                        <p className="text-sm font-bold text-orange-400 sm:text-base">
                            {formatCurrency(
                                totalRemaining
                            )}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            inline-flex
                            min-h-[40px]
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-900
                            px-4
                            text-xs
                            font-semibold
                            text-slate-300
                            transition-all
                            hover:border-slate-600
                            hover:bg-slate-800
                            hover:text-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-slate-600
                        "
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
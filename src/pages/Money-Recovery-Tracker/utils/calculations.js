// ============================================================
// Money Recovery Tracker
// calculations.js
// ============================================================

/**
 * Safely convert value to number
 */
export const toNumber = (value) => {
    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : 0;
};

/**
 * Get total amount given
 */
export const getTotalGiven = (recoveries = []) => {
    return recoveries.reduce(
        (total, recovery) => {
            return (
                total +
                toNumber(recovery.amount)
            );
        },
        0
    );
};

/**
 * Get paid/recovered amount for ONE recovery
 *
 * Supports:
 * - payments[]
 * - recoveredAmount
 * - paidAmount
 */
export const getPaidAmount = (
    recovery = {}
) => {
    // First calculate from payment history
    if (
        Array.isArray(
            recovery.payments
        )
    ) {
        return recovery.payments.reduce(
            (total, payment) => {
                return (
                    total +
                    toNumber(
                        payment.amount
                    )
                );
            },
            0
        );
    }

    // Existing recoveredAmount
    if (
        recovery.recoveredAmount !==
        undefined
    ) {
        return toNumber(
            recovery.recoveredAmount
        );
    }

    // Existing paidAmount
    if (
        recovery.paidAmount !==
        undefined
    ) {
        return toNumber(
            recovery.paidAmount
        );
    }

    return 0;
};

/**
 * Get total recovered amount
 */
export const getTotalRecovered = (
    recoveries = []
) => {
    return recoveries.reduce(
        (total, recovery) => {
            return (
                total +
                getPaidAmount(recovery)
            );
        },
        0
    );
};

/**
 * Get remaining amount for ONE recovery
 */
export const getRemainingAmount = (
    recovery = {}
) => {
    const totalAmount =
        toNumber(recovery.amount);

    const paidAmount =
        getPaidAmount(recovery);

    return Math.max(
        totalAmount - paidAmount,
        0
    );
};

/**
 * Get total remaining amount
 */
export const getTotalRemaining = (
    recoveries = []
) => {
    return recoveries.reduce(
        (total, recovery) => {
            return (
                total +
                getRemainingAmount(
                    recovery
                )
            );
        },
        0
    );
};

/**
 * Get recovery percentage for ONE recovery
 */
export const getRecoveryPercentage = (
    recovery = {}
) => {
    const totalAmount =
        toNumber(recovery.amount);

    const paidAmount =
        getPaidAmount(recovery);

    if (totalAmount <= 0) {
        return 0;
    }

    return Math.min(
        Math.round(
            (paidAmount / totalAmount) *
            100
        ),
        100
    );
};

/**
 * Get overall recovery percentage
 */
export const getOverallRecoveryRate = (
    recoveries = []
) => {
    const totalGiven =
        getTotalGiven(recoveries);

    const totalRecovered =
        getTotalRecovered(recoveries);

    if (totalGiven <= 0) {
        return 0;
    }

    return Math.min(
        Math.round(
            (totalRecovered /
                totalGiven) *
            100
        ),
        100
    );
};

/**
 * Check whether recovery is completed
 */
export const isCompleted = (
    recovery = {}
) => {
    const totalAmount =
        toNumber(recovery.amount);

    const paidAmount =
        getPaidAmount(recovery);

    return (
        totalAmount > 0 &&
        paidAmount >= totalAmount
    );
};

/**
 * Check whether recovery is partially paid
 */
export const isPartiallyRecovered = (
    recovery = {}
) => {
    const totalAmount =
        toNumber(recovery.amount);

    const paidAmount =
        getPaidAmount(recovery);

    return (
        paidAmount > 0 &&
        paidAmount < totalAmount
    );
};

/**
 * Check whether recovery is overdue
 */
export const isOverdue = (
    recovery = {}
) => {
    if (!recovery.dueDate) {
        return false;
    }

    if (isCompleted(recovery)) {
        return false;
    }

    const dueDate = new Date(
        recovery.dueDate
    );

    if (
        Number.isNaN(
            dueDate.getTime()
        )
    ) {
        return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    dueDate.setHours(
        0,
        0,
        0,
        0
    );

    return dueDate < today;
};

/**
 * Get recovery status
 */
export const getRecoveryStatus = (
    recovery = {}
) => {
    if (isCompleted(recovery)) {
        return "completed";
    }

    if (isOverdue(recovery)) {
        return "overdue";
    }

    if (
        isPartiallyRecovered(
            recovery
        )
    ) {
        return "partial";
    }

    return "pending";
};

/**
 * Get completed count
 */
export const getCompletedCount = (
    recoveries = []
) => {
    return recoveries.filter(
        (recovery) =>
            isCompleted(recovery)
    ).length;
};

/**
 * Get overdue count
 */
export const getOverdueCount = (
    recoveries = []
) => {
    return recoveries.filter(
        (recovery) =>
            isOverdue(recovery)
    ).length;
};

/**
 * Get partially recovered count
 */
export const getPartialCount = (
    recoveries = []
) => {
    return recoveries.filter(
        (recovery) =>
            isPartiallyRecovered(
                recovery
            )
    ).length;
};

/**
 * Get unique people
 */
export const getPeople = (
    recoveries = []
) => {
    const peopleMap =
        new Map();

    recoveries.forEach(
        (recovery) => {
            const name =
                recovery.personName?.trim();

            if (!name) {
                return;
            }

            const key =
                recovery.phoneNumber?.trim() ||
                recovery.phone?.trim() ||
                name.toLowerCase();

            if (
                !peopleMap.has(key)
            ) {
                peopleMap.set(key, {
                    name,
                    phoneNumber:
                        recovery.phoneNumber ||
                        recovery.phone ||
                        "",
                    address:
                        recovery.address ||
                        "",
                    totalGiven: 0,
                    totalRecovered: 0,
                    remaining: 0,
                    records: 0,
                });
            }

            const person =
                peopleMap.get(key);

            person.totalGiven +=
                toNumber(
                    recovery.amount
                );

            person.totalRecovered +=
                getPaidAmount(
                    recovery
                );

            person.remaining +=
                getRemainingAmount(
                    recovery
                );

            person.records += 1;
        }
    );

    return Array.from(
        peopleMap.values()
    );
};

/**
 * Get people count
 */
export const getPeopleCount = (
    recoveries = []
) => {
    return getPeople(
        recoveries
    ).length;
};

/**
 * ============================================================
 * MAIN STATS FUNCTION
 * ============================================================
 *
 * This is the function your
 * MoneyRecoveryTracker.jsx
 * is currently trying to import.
 *
 * Usage:
 *
 * const stats = calculateStats(recoveries);
 *
 */
export const calculateStats = (
    recoveries = []
) => {
    const totalGiven =
        getTotalGiven(recoveries);

    const totalRecovered =
        getTotalRecovered(
            recoveries
        );

    const totalRemaining =
        getTotalRemaining(
            recoveries
        );

    const completed =
        getCompletedCount(
            recoveries
        );

    const overdue =
        getOverdueCount(
            recoveries
        );

    const partial =
        getPartialCount(
            recoveries
        );

    const people =
        getPeopleCount(
            recoveries
        );

    const recoveryRate =
        totalGiven > 0
            ? Math.min(
                Math.round(
                    (totalRecovered /
                        totalGiven) *
                    100
                ),
                100
            )
            : 0;

    const overdueAmount =
        recoveries
            .filter((recovery) =>
                isOverdue(recovery)
            )
            .reduce(
                (
                    total,
                    recovery
                ) => {
                    return (
                        total +
                        getRemainingAmount(
                            recovery
                        )
                    );
                },
                0
            );

    return {
        // Main dashboard values
        totalGiven,
        totalRecovered,
        totalRemaining,

        // Alternative naming
        remaining: totalRemaining,

        // Counts
        totalRecords:
            recoveries.length,

        people,

        completed,

        overdue,

        partial,

        // Recovery percentage
        recoveryRate,

        // Overdue money
        overdueAmount,

        // Useful aliases
        totalPeople: people,

        completedCount:
            completed,

        overdueCount:
            overdue,

        partialCount:
            partial,
    };
};

/**
 * Get simple summary
 */
export const getSummary = (
    recoveries = []
) => {
    return calculateStats(
        recoveries
    );
};

/**
 * Get days difference between today
 * and target date
 */
export const getDaysDifference = (
    date
) => {
    if (!date) {
        return null;
    }

    const targetDate =
        new Date(date);

    if (
        Number.isNaN(
            targetDate.getTime()
        )
    ) {
        return null;
    }

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    targetDate.setHours(
        0,
        0,
        0,
        0
    );

    return Math.round(
        (targetDate.getTime() -
            today.getTime()) /
        (1000 * 60 * 60 * 24)
    );
};

/**
 * Get due date status text
 */
export const getDueDateStatus = (
    recovery = {}
) => {
    if (!recovery.dueDate) {
        return "No due date";
    }

    if (isCompleted(recovery)) {
        return "Completed";
    }

    const days =
        getDaysDifference(
            recovery.dueDate
        );

    if (days === null) {
        return "Invalid date";
    }

    if (days < 0) {
        return `${Math.abs(
            days
        )} ${Math.abs(days) === 1
                ? "day"
                : "days"
            } overdue`;
    }

    if (days === 0) {
        return "Due today";
    }

    if (days === 1) {
        return "Due tomorrow";
    }

    return `Due in ${days} days`;
};

/**
 * Get recoveries by status
 */
export const getRecoveriesByStatus = (
    recoveries = [],
    status
) => {
    return recoveries.filter(
        (recovery) =>
            getRecoveryStatus(
                recovery
            ) === status
    );
};

/**
 * Get recoveries by category
 */
export const getRecoveriesByCategory = (
    recoveries = [],
    category
) => {
    if (!category) {
        return recoveries;
    }

    return recoveries.filter(
        (recovery) =>
            recovery.category ===
            category
    );
};

/**
 * Search recoveries
 */
export const searchRecoveries = (
    recoveries = [],
    search = ""
) => {
    const value =
        search
            .trim()
            .toLowerCase();

    if (!value) {
        return recoveries;
    }

    return recoveries.filter(
        (recovery) => {
            return (
                recovery.personName
                    ?.toLowerCase()
                    .includes(value) ||
                recovery.phoneNumber
                    ?.toLowerCase()
                    .includes(value) ||
                recovery.phone
                    ?.toLowerCase()
                    .includes(value) ||
                recovery.category
                    ?.toLowerCase()
                    .includes(value) ||
                recovery.notes
                    ?.toLowerCase()
                    .includes(value)
            );
        }
    );
};
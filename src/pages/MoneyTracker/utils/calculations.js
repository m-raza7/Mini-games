export const calculateTotals = (
    transactions = []
) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(
        (transaction) => {
            const amount = Number(
                transaction.amount
            );

            if (
                transaction.type ===
                "income"
            ) {
                totalIncome += amount;
            }

            if (
                transaction.type ===
                "expense"
            ) {
                totalExpense += amount;
            }
        }
    );

    return {
        totalIncome,
        totalExpense,
        balance:
            totalIncome -
            totalExpense,
    };
};


// ==========================================
// CURRENCY
// ==========================================

export const formatCurrency = (
    amount = 0
) => {
    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }
    ).format(Number(amount) || 0);
};


// ==========================================
// DATE
// ==========================================

export const formatDate = (
    date
) => {
    if (!date) {
        return "";
    }

    return new Date(
        date
    ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};


// ==========================================
// SHORT DATE
// ==========================================

export const formatShortDate = (
    date
) => {
    if (!date) {
        return "";
    }

    return new Date(
        date
    ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
    });
};


// ==========================================
// TRANSACTION TOTAL BY CATEGORY
// ==========================================

export const getCategoryTotals = (
    transactions = [],
    type = "expense"
) => {
    const categoryTotals = {};

    transactions
        .filter(
            (transaction) =>
                transaction.type === type
        )
        .forEach((transaction) => {
            const category =
                transaction.category ||
                "Other";

            const amount = Number(
                transaction.amount
            );

            if (
                categoryTotals[category]
            ) {
                categoryTotals[category] +=
                    amount;
            } else {
                categoryTotals[category] =
                    amount;
            }
        });

    return categoryTotals;
};


// ==========================================
// MONTHLY TOTALS
// ==========================================

export const getMonthlyTotals = (
    transactions = []
) => {
    const monthlyData = {};

    transactions.forEach(
        (transaction) => {
            const date = new Date(
                transaction.date
            );

            const month =
                date.toLocaleDateString(
                    "en-IN",
                    {
                        month: "short",
                    }
                );

            if (!monthlyData[month]) {
                monthlyData[month] = {
                    income: 0,
                    expense: 0,
                };
            }

            if (
                transaction.type ===
                "income"
            ) {
                monthlyData[month].income +=
                    Number(
                        transaction.amount
                    );
            }

            if (
                transaction.type ===
                "expense"
            ) {
                monthlyData[month].expense +=
                    Number(
                        transaction.amount
                    );
            }
        }
    );

    return monthlyData;
};
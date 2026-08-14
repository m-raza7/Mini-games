// ============================================================
// Money Recovery Tracker
// Utility Formatters
// ============================================================

/**
 * Format amount as Indian Rupee currency
 *
 * Example:
 * formatCurrency(5000)
 * => ₹5,000
 */
export const formatCurrency = (amount = 0) => {
    const value = Number(amount);

    if (Number.isNaN(value)) {
        return "₹0";
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
};

/**
 * Format number using Indian number system
 *
 * Example:
 * formatNumber(100000)
 * => 1,00,000
 */
export const formatNumber = (number = 0) => {
    const value = Number(number);

    if (Number.isNaN(value)) {
        return "0";
    }

    return new Intl.NumberFormat("en-IN").format(value);
};

/**
 * Format date
 *
 * Input:
 * 2026-08-01
 *
 * Output:
 * 01 Aug 2026
 */
export const formatDate = (date) => {
    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

/**
 * Format date in short format
 *
 * Example:
 * 2026-08-01
 * => 01/08/2026
 */
export const formatDateShort = (date) => {
    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

/**
 * Format time
 *
 * Input:
 * 18:00
 *
 * Output:
 * 06:00 PM
 */
export const formatTime = (time) => {
    if (!time) {
        return "-";
    }

    // If time is already like "06:00 PM"
    if (/am|pm/i.test(String(time))) {
        return String(time).toUpperCase();
    }

    const parts = String(time).split(":");

    if (parts.length < 2) {
        return "-";
    }

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (
        Number.isNaN(hours) ||
        Number.isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return "-";
    }

    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

/**
 * Format date and time together
 *
 * Example:
 * formatDateTime("2026-08-20", "18:00")
 *
 * => 20 Aug 2026, 06:00 PM
 */
export const formatDateTime = (date, time) => {
    if (!date) {
        return "-";
    }

    const formattedDate = formatDate(date);

    if (!time) {
        return formattedDate;
    }

    return `${formattedDate}, ${formatTime(time)}`;
};

/**
 * Format phone number
 *
 * Example:
 * 9876543210
 * => 98765 43210
 */
export const formatPhone = (phone) => {
    if (!phone) {
        return "-";
    }

    const value = String(phone).replace(/\D/g, "");

    if (value.length === 10) {
        return `${value.slice(0, 5)} ${value.slice(5)}`;
    }

    return value;
};

/**
 * Get initials from person's name
 *
 * Example:
 * Rahul Sharma
 * => RS
 */
export const getInitials = (name = "") => {
    if (!name) {
        return "?";
    }

    return String(name)
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};

/**
 * Capitalize first letter
 *
 * Example:
 * personal
 * => Personal
 */
export const capitalize = (value = "") => {
    if (!value) {
        return "";
    }

    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
};

/**
 * Convert text to title case
 *
 * Example:
 * emergency medical
 * => Emergency Medical
 */
export const titleCase = (value = "") => {
    if (!value) {
        return "";
    }

    return String(value)
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
};

/**
 * Get recovery status
 *
 * Returns:
 * pending
 * partial
 * completed
 * overdue
 */
export const getRecoveryStatus = (recovery) => {
    if (!recovery) {
        return "pending";
    }

    const amount = Number(recovery.amount) || 0;
    const recoveredAmount =
        Number(recovery.recoveredAmount) || 0;

    // Fully recovered
    if (recoveredAmount >= amount && amount > 0) {
        return "completed";
    }

    // Partially recovered
    if (recoveredAmount > 0 && recoveredAmount < amount) {
        return "partial";
    }

    // Check due date
    if (recovery.dueDate) {
        const dueDate = new Date(recovery.dueDate);

        if (!Number.isNaN(dueDate.getTime())) {
            const today = new Date();

            today.setHours(0, 0, 0, 0);
            dueDate.setHours(23, 59, 59, 999);

            if (dueDate < today) {
                return "overdue";
            }
        }
    }

    return "pending";
};

/**
 * Get readable status label
 */
export const getStatusLabel = (status) => {
    const labels = {
        pending: "Pending",
        partial: "Partially Recovered",
        completed: "Completed",
        overdue: "Overdue",
    };

    return labels[status] || "Pending";
};

/**
 * Get category label
 */
export const getCategoryLabel = (category) => {
    if (!category) {
        return "Personal";
    }

    const categories = {
        personal: "Personal",
        business: "Business",
        family: "Family",
        friend: "Friend",
        emergency: "Emergency",
        education: "Education",
        medical: "Medical",
        travel: "Travel",
        shopping: "Shopping",
        other: "Other",
    };

    return categories[category] || titleCase(category);
};

/**
 * Calculate remaining amount
 *
 * Example:
 * amount = 5000
 * recovered = 2000
 *
 * => 3000
 */
export const getRemainingAmount = (
    amount = 0,
    recoveredAmount = 0
) => {
    const total = Number(amount) || 0;
    const recovered = Number(recoveredAmount) || 0;

    return Math.max(total - recovered, 0);
};

/**
 * Calculate recovery percentage
 *
 * Example:
 * amount = 5000
 * recovered = 2500
 *
 * => 50
 */
export const getRecoveryPercentage = (
    amount = 0,
    recoveredAmount = 0
) => {
    const total = Number(amount) || 0;
    const recovered = Number(recoveredAmount) || 0;

    if (total <= 0) {
        return 0;
    }

    return Math.min(
        Math.round((recovered / total) * 100),
        100
    );
};

/**
 * Format recovery percentage
 *
 * Example:
 * 50
 * => 50%
 */
export const formatPercentage = (percentage = 0) => {
    const value = Number(percentage);

    if (Number.isNaN(value)) {
        return "0%";
    }

    return `${Math.round(value)}%`;
};

/**
 * Get relative due date text
 *
 * Examples:
 * Due today
 * Due tomorrow
 * 5 days overdue
 */
export const getDueDateText = (dueDate) => {
    if (!dueDate) {
        return "-";
    }

    const date = new Date(dueDate);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const difference =
        Math.round(
            (date.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        );

    if (difference === 0) {
        return "Due today";
    }

    if (difference === 1) {
        return "Due tomorrow";
    }

    if (difference === -1) {
        return "1 day overdue";
    }

    if (difference < 0) {
        return `${Math.abs(difference)} days overdue`;
    }

    return `Due in ${difference} days`;
};

/**
 * Format recovery amount summary
 *
 * Example:
 * ₹5,000 remaining
 */
export const formatRemaining = (amount) => {
    return `${formatCurrency(amount)} remaining`;
};

/**
 * Safely convert value to number
 */
export const toNumber = (value) => {
    const number = Number(value);

    return Number.isNaN(number) ? 0 : number;
};
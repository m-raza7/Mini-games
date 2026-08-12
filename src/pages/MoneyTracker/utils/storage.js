const TRANSACTION_KEY = "miniverse_transactions";
const CATEGORY_KEY = "miniverse_custom_categories";

// ==========================================
// TRANSACTIONS
// ==========================================

export const getTransactions = () => {
    try {
        const data = localStorage.getItem(TRANSACTION_KEY);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to get transactions:", error);
        return [];
    }
};

export const saveTransactions = (transactions) => {
    localStorage.setItem(
        TRANSACTION_KEY,
        JSON.stringify(transactions)
    );
};

export const addTransaction = (transaction) => {
    const transactions = getTransactions();

    const newTransaction = {
        id: Date.now().toString(),
        ...transaction,
        createdAt: new Date().toISOString(),
    };

    saveTransactions([newTransaction, ...transactions]);

    return newTransaction;
};

export const deleteTransaction = (id) => {
    const transactions = getTransactions();

    const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
    );

    saveTransactions(updatedTransactions);
};

export const clearTransactions = () => {
    localStorage.removeItem(TRANSACTION_KEY);
};

// ==========================================
// CUSTOM CATEGORIES
// ==========================================

export const getCustomCategories = () => {
    try {
        const data = localStorage.getItem(CATEGORY_KEY);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to get categories:", error);
        return [];
    }
};

export const saveCustomCategories = (categories) => {
    localStorage.setItem(
        CATEGORY_KEY,
        JSON.stringify(categories)
    );
};

export const addCustomCategory = (category) => {
    const categories = getCustomCategories();

    // Prevent duplicate categories
    const alreadyExists = categories.some(
        (item) =>
            item.name.toLowerCase() === category.name.toLowerCase()
    );

    if (alreadyExists) {
        return null;
    }

    const newCategory = {
        id: Date.now().toString(),
        name: category.name,
        icon: category.icon || "📁",
        color: category.color || "from-purple-500 to-pink-500",
        createdAt: new Date().toISOString(),
    };

    saveCustomCategories([
        ...categories,
        newCategory,
    ]);

    return newCategory;
};

export const deleteCustomCategory = (id) => {
    const categories = getCustomCategories();

    const updatedCategories = categories.filter(
        (category) => category.id !== id
    );

    saveCustomCategories(updatedCategories);
};

export const clearCustomCategories = () => {
    localStorage.removeItem(CATEGORY_KEY);
};
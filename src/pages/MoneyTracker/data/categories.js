import {
    Utensils,
    ShoppingBag,
    Car,
    Receipt,
    Zap,
    House,
    Smartphone,
    Wifi,
    Film,
    HeartPulse,
    GraduationCap,
    Gift,
    MoreHorizontal,
    Fuel,
    Banknote,
    Briefcase,
} from "lucide-react";

export const expenseCategories = [
    {
        id: "food",
        name: "Food",
        icon: Utensils,
        color: "orange",
    },
    {
        id: "shopping",
        name: "Shopping",
        icon: ShoppingBag,
        color: "pink",
    },
    {
        id: "transport",
        name: "Transport",
        icon: Car,
        color: "blue",
    },
    {
        id: "bills",
        name: "Bills",
        icon: Receipt,
        color: "red",
    },
    {
        id: "electricity",
        name: "Electricity",
        icon: Zap,
        color: "yellow",
    },
    {
        id: "rent",
        name: "House Rent",
        icon: House,
        color: "purple",
    },
    {
        id: "mobile",
        name: "Mobile Recharge",
        icon: Smartphone,
        color: "green",
    },
    {
        id: "internet",
        name: "Internet",
        icon: Wifi,
        color: "cyan",
    },
    {
        id: "entertainment",
        name: "Entertainment",
        icon: Film,
        color: "pink",
    },
    {
        id: "health",
        name: "Health",
        icon: HeartPulse,
        color: "rose",
    },
    {
        id: "education",
        name: "Education",
        icon: GraduationCap,
        color: "indigo",
    },
    {
        id: "gift",
        name: "Gifts",
        icon: Gift,
        color: "violet",
    },

    // ==============================
    // Fuel Categories
    // ==============================

    {
        id: "petrol",
        name: "Petrol",
        icon: Fuel,
        color: "orange",
    },
    {
        id: "diesel",
        name: "Diesel",
        icon: Fuel,
        color: "blue",
    },
    {
        id: "cng",
        name: "CNG Gas",
        icon: Fuel,
        color: "cyan",
    },

    {
        id: "other",
        name: "Other",
        icon: MoreHorizontal,
        color: "gray",
    },
];

export const incomeCategories = [
    {
        id: "salary",
        name: "Salary",
        icon: Banknote,
        color: "emerald",
    },
    {
        id: "business",
        name: "Business",
        icon: Briefcase,
        color: "blue",
    },
    {
        id: "gift-income",
        name: "Gift",
        icon: Gift,
        color: "violet",
    },
    {
        id: "other-income",
        name: "Other",
        icon: MoreHorizontal,
        color: "gray",
    },
];
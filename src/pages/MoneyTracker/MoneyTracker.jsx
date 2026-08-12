import React from "react";
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import MoneyDashboard from "./pages/MoneyDashboard";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Categories from "./pages/Categories";

const MoneyTracker = () => {
    return (
        <Routes>

            {/* Dashboard */}
            <Route
                index
                element={<MoneyDashboard />}
            />

            {/* Income */}
            <Route
                path="income"
                element={<AddIncome />}
            />

            {/* Expense */}
            <Route
                path="expense"
                element={<AddExpense />}
            />

            {/* Transactions */}
            <Route
                path="transactions"
                element={<Transactions />}
            />

            {/* Analytics */}
            <Route
                path="analytics"
                element={<Analytics />}
            />

            {/* Categories */}
            <Route
                path="categories"
                element={<Categories />}
            />

            {/* Unknown Money Tracker Route */}
            <Route
                path="*"
                element={
                    <Navigate
                        to="/money-tracker"
                        replace
                    />
                }
            />

        </Routes>
    );
};

export default MoneyTracker;
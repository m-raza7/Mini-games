import React from "react";
import {
    Package,
    ShoppingCart,
    IndianRupee,
} from "lucide-react";

const Summary = ({ expenses }) => {
    const totalProducts = expenses.length;

    const totalQuantity = expenses.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const grandTotal = expenses.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cards = [
        {
            title: "Products",
            value: totalProducts,
            icon: <Package size={32} />,
            bg: "from-blue-500 to-cyan-500",
        },
        {
            title: "Quantity",
            value: totalQuantity,
            icon: <ShoppingCart size={32} />,
            bg: "from-green-500 to-emerald-500",
        },
        {
            title: "Grand Total",
            value: `₹ ${grandTotal.toLocaleString()}`,
            icon: <IndianRupee size={32} />,
            bg: "from-orange-500 to-red-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`
            rounded-3xl
            bg-gradient-to-r
            ${card.bg}
            p-6
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
          `}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/80 text-sm">
                                {card.title}
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {card.value}
                            </h2>
                        </div>

                        <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Summary;
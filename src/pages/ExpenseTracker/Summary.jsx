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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {cards.map((card, index) => (
                <div
                    key={index}
                    className="
                group
                relative
                overflow-hidden
                rounded-[20px]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-4
                shadow-xl
                shadow-black/20
                backdrop-blur-xl
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-white/[0.12]
                hover:bg-white/[0.05]
            "
                >

                    {/* Background Glow */}
                    <div
                        className={`
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    opacity-10
                    blur-2xl
                    ${card.bg}
                `}
                    />

                    <div className="
                relative
                flex
                items-center
                justify-between
                gap-3
            ">

                        {/* Content */}
                        <div className="min-w-0">

                            <p className="
                        text-[10px]
                        font-medium
                        text-slate-500
                        sm:text-xs
                    ">
                                {card.title}
                            </p>

                            <h2 className="
                        mt-1
                        truncate
                        text-xl
                        font-extrabold
                        tracking-tight
                        text-white
                        sm:text-2xl
                    ">
                                {card.value}
                            </h2>

                        </div>


                        {/* Icon */}
                        <div
                            className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-[13px]
                        border
                        border-white/[0.08]
                        bg-white/[0.05]
                        backdrop-blur-xl
                        transition
                        duration-200
                        group-hover:scale-105
                        ${card.text || "text-violet-400"}
                    `}
                        >
                            {card.icon}
                        </div>

                    </div>

                </div>
            ))}

        </div>
    );
};

export default Summary;
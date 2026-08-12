import {
    ArrowDownLeft,
    ArrowUpRight,
    Receipt,
} from "lucide-react";

import { formatCurrency } from "../utils/calculations";

const SummaryCards = ({
    income = 0,
    expense = 0,
    transactionCount = 0,
}) => {
    const cards = [
        {
            title: "Income",
            value: formatCurrency(
                income
            ),
            icon: ArrowDownLeft,
            className:
                "text-emerald-400 bg-emerald-500/10",
        },
        {
            title: "Expenses",
            value: formatCurrency(
                expense
            ),
            icon: ArrowUpRight,
            className:
                "text-red-400 bg-red-500/10",
        },
        {
            title: "Transactions",
            value: transactionCount,
            icon: Receipt,
            className:
                "text-blue-400 bg-blue-500/10",
        },
    ];

    return (
        <div className="
            grid
            grid-cols-2
            gap-3
            md:grid-cols-3
        ">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.05]
                            p-4
                            backdrop-blur-xl
                        "
                    >
                        <div
                            className={`
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                ${card.className}
                            `}
                        >
                            <Icon
                                size={18}
                            />
                        </div>

                        <p className="
                            mt-3
                            text-xs
                            text-white/40
                        ">
                            {card.title}
                        </p>

                        <p className="
                            mt-1
                            truncate
                            text-lg
                            font-bold
                            text-white
                        ">
                            {card.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default SummaryCards;
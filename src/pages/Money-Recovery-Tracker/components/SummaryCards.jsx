import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
    HandCoins,
    Users,
    Wallet,
} from "lucide-react";

import { formatCurrency } from "../utils/formatters";

export default function SummaryCards({
    stats,
}) {

    const cards = [
        {
            title: "Total Given",
            value: formatCurrency(stats.totalGiven),
            icon: HandCoins,
            iconClass: "bg-blue-500/10 text-blue-400",
        },
        {
            title: "Recovered",
            value: formatCurrency(stats.totalRecovered),
            icon: CheckCircle2,
            iconClass: "bg-emerald-500/10 text-emerald-400",
        },
        {
            title: "Remaining",
            value: formatCurrency(stats.remaining),
            icon: Clock3,
            iconClass: "bg-amber-500/10 text-amber-400",
        },
        {
            title: "Overdue",
            value: formatCurrency(stats.overdue),
            icon: AlertTriangle,
            iconClass: "bg-red-500/10 text-red-400",
        },
        {
            title: "People",
            value: stats.people,
            icon: Users,
            iconClass: "bg-violet-500/10 text-violet-400",
        },
        {
            title: "Completed",
            value: stats.completed,
            icon: Wallet,
            iconClass: "bg-teal-500/10 text-teal-400",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="
                    group
                    rounded-[18px]
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    p-3.5
                    shadow-xl
                    shadow-black/10
                    backdrop-blur-xl
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-emerald-400/15
                    hover:bg-white/[0.04]
                "
                    >

                        {/* Icon */}
                        <div
                            className={`
                        mb-3
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-[11px]
                        border
                        border-white/[0.06]
                        transition
                        group-hover:scale-105
                        ${card.iconClass}
                    `}
                        >
                            <Icon size={17} />
                        </div>


                        {/* Title */}
                        <p
                            className="
                        truncate
                        text-[10px]
                        font-medium
                        text-slate-500
                        sm:text-xs
                    "
                        >
                            {card.title}
                        </p>


                        {/* Value */}
                        <p
                            className="
                        mt-1
                        truncate
                        text-base
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-lg
                    "
                        >
                            {card.value}
                        </p>

                    </div>
                );
            })}
        </div>
    );
}
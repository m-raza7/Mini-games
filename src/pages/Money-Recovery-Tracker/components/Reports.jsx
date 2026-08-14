import {
    BarChart3,
    TrendingUp,
} from "lucide-react";

import { formatCurrency } from "../utils/formatters";

export default function Reports({ stats }) {
    return (
        <section
            className="
        rounded-[22px]
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-4
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
        sm:p-5
    "
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                    <h2
                        className="
                    text-sm
                    font-bold
                    text-white
                    sm:text-base
                "
                    >
                        Recovery Reports
                    </h2>

                    <p
                        className="
                    mt-1
                    text-[10px]
                    leading-4
                    text-slate-500
                    sm:text-xs
                    sm:leading-5
                "
                    >
                        Understand your money recovery progress.
                    </p>

                </div>


                {/* Header Icon */}
                <div
                    className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-[12px]
                border
                border-emerald-400/15
                bg-emerald-400/[0.08]
                text-emerald-400
            "
                >
                    <BarChart3 size={17} />
                </div>

            </div>


            {/* Statistics */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">

                {/* Recovery Rate */}
                <div
                    className="
                rounded-[16px]
                border
                border-white/[0.06]
                bg-white/[0.025]
                p-3.5
                transition
                hover:bg-white/[0.04]
            "
                >

                    <div
                        className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-emerald-400/10
                    text-emerald-400
                "
                    >
                        <TrendingUp size={15} />
                    </div>

                    <p
                        className="
                    mt-3
                    text-[10px]
                    font-medium
                    text-slate-500
                    sm:text-xs
                "
                    >
                        Recovery Rate
                    </p>

                    <p
                        className="
                    mt-1
                    text-lg
                    font-bold
                    text-white
                    sm:text-xl
                "
                    >
                        {stats.recoveryRate}%
                    </p>

                </div>


                {/* Outstanding */}
                <div
                    className="
                rounded-[16px]
                border
                border-orange-400/10
                bg-orange-400/[0.035]
                p-3.5
                transition
                hover:bg-orange-400/[0.05]
            "
                >

                    <p
                        className="
                    text-[10px]
                    font-medium
                    text-slate-500
                    sm:text-xs
                "
                    >
                        Outstanding
                    </p>

                    <p
                        className="
                    mt-2
                    truncate
                    text-base
                    font-bold
                    text-orange-400
                    sm:text-xl
                "
                    >
                        {formatCurrency(
                            stats.remaining
                        )}
                    </p>

                    <p
                        className="
                    mt-1
                    text-[9px]
                    text-slate-600
                    sm:text-[10px]
                "
                    >
                        Still to recover
                    </p>

                </div>

            </div>


            {/* Progress */}
            <div className="mt-5">

                <div
                    className="
                mb-2
                flex
                items-center
                justify-between
                gap-2
            "
                >

                    <span
                        className="
                    text-[10px]
                    font-medium
                    text-slate-500
                    sm:text-xs
                "
                    >
                        Overall recovery
                    </span>

                    <span
                        className="
                    text-[10px]
                    font-bold
                    text-emerald-400
                    sm:text-xs
                "
                    >
                        {stats.recoveryRate}%
                    </span>

                </div>


                {/* Progress Background */}
                <div
                    className="
                h-2
                overflow-hidden
                rounded-full
                bg-white/[0.06]
            "
                >

                    <div
                        className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-emerald-500
                    to-emerald-400
                    shadow-[0_0_12px_rgba(52,211,153,0.35)]
                    transition-all
                    duration-500
                "
                        style={{
                            width: `${stats.recoveryRate}%`,
                        }}
                    />

                </div>

            </div>

        </section>
    );
}
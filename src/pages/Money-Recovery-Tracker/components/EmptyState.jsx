import {
    Plus,
    WalletCards,
} from "lucide-react";

export default function EmptyState({
    onAdd,
    hasFilters,
}) {
    return (
        <div className="
    flex
    min-h-[320px]
    flex-col
    items-center
    justify-center
    rounded-[22px]
    border
    border-dashed
    border-white/[0.08]
    bg-white/[0.025]
    px-5
    text-center
    shadow-xl
    shadow-black/10
    backdrop-blur-xl
    sm:min-h-[360px]
">

            {/* Icon */}
            <div className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-[18px]
        border
        border-emerald-400/15
        bg-emerald-400/[0.08]
        text-emerald-400
        shadow-lg
        shadow-emerald-500/5
    ">
                <WalletCards size={25} />
            </div>


            {/* Heading */}
            <h3 className="
        mt-5
        text-sm
        font-bold
        text-white
        sm:text-base
    ">
                {hasFilters
                    ? "No matching recoveries"
                    : "No recovery records yet"}
            </h3>


            {/* Description */}
            <p className="
        mt-2
        max-w-sm
        text-[10px]
        leading-5
        text-slate-500
        sm:text-xs
        sm:leading-6
    ">
                {hasFilters
                    ? "Try changing your search or filters."
                    : "Start tracking money you've given to friends, family or other people."}
            </p>


            {/* Add Recovery */}
            {!hasFilters && (
                <button
                    onClick={onAdd}
                    className="
                mt-5
                flex
                h-9
                items-center
                gap-2
                rounded-full
                bg-gradient-to-r
                from-emerald-500
                to-green-500
                px-5
                text-[11px]
                font-bold
                text-white
                shadow-lg
                shadow-emerald-500/20
                transition
                hover:from-emerald-400
                hover:to-green-400
                active:scale-95
                sm:h-10
                sm:text-xs
            "
                >
                    <Plus size={15} />
                    Add Recovery
                </button>
            )}

        </div>
    );
}
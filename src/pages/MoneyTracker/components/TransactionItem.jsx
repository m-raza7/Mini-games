import {
    ArrowDownLeft,
    ArrowUpRight,
    Trash2,
} from "lucide-react";

import {
    formatCurrency,
    formatShortDate,
} from "../utils/calculations";

const TransactionItem = ({
    transaction,
    onDelete,
}) => {
    const isIncome =
        transaction.type === "income";

    return (
        <div className="
            group
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/[0.04]
            p-3
            transition
            hover:bg-white/[0.07]
        ">
            <div
                className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${isIncome
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }
                `}
            >
                {isIncome ? (
                    <ArrowDownLeft
                        size={20}
                    />
                ) : (
                    <ArrowUpRight
                        size={20}
                    />
                )}
            </div>

            <div className="
                min-w-0
                flex-1
            ">
                <p className="
                    truncate
                    font-medium
                    text-white
                ">
                    {transaction.title}
                </p>

                <div className="
                    mt-1
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-white/40
                ">
                    <span>
                        {transaction.category}
                    </span>

                    <span>•</span>

                    <span>
                        {formatShortDate(
                            transaction.date
                        )}
                    </span>
                </div>
            </div>

            <div className="
                flex
                items-center
                gap-2
            ">
                <p
                    className={`
                        text-right
                        text-sm
                        font-semibold
                        sm:text-base
                        ${isIncome
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                    `}
                >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(
                        transaction.amount
                    )}
                </p>

                {onDelete && (
                    <button
                        onClick={() =>
                            onDelete(
                                transaction.id
                            )
                        }
                        className="
                            rounded-lg
                            p-2
                            text-white/20
                            opacity-100
                            transition
                            hover:bg-red-500/10
                            hover:text-red-400
                            sm:opacity-0
                            sm:group-hover:opacity-100
                        "
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TransactionItem;
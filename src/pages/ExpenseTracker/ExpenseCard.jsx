import React from "react";
import {
    Plus,
    Minus,
    Pencil,
    Trash2,
    ShoppingBag,
} from "lucide-react";

const ExpenseCard = ({
    expense,
    onIncrease,
    onDecrease,
    onDelete,
    onEdit,
}) => {
    return (
        <div
            className="
        rounded-[20px]
        border
        border-white/[0.08]
        bg-white/[0.035]
        p-4
        text-white
        shadow-xl
        shadow-black/20
        backdrop-blur-xl
        transition-all
        duration-200
        hover:border-violet-400/20
        hover:bg-white/[0.05]
        sm:p-5
    "
        >
            <div className="
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
    ">

                {/* Product Details */}
                <div className="flex min-w-0 items-start gap-3">

                    {/* Icon */}
                    <div className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-[14px]
                border
                border-violet-400/15
                bg-violet-500/10
                sm:h-12
                sm:w-12
            ">
                        <ShoppingBag
                            size={21}
                            className="text-violet-400"
                        />
                    </div>


                    {/* Details */}
                    <div className="min-w-0 flex-1">

                        {/* Name */}
                        <h3 className="
                    truncate
                    text-sm
                    font-bold
                    text-white
                    sm:text-base
                ">
                            {expense.name}
                        </h3>


                        {/* Price */}
                        <div className="
                    mt-1.5
                    flex
                    flex-wrap
                    items-center
                    gap-1.5
                    text-[10px]
                    text-slate-500
                    sm:text-xs
                ">
                            <span>
                                Price
                            </span>

                            <span className="font-semibold text-green-400">
                                ₹{expense.price}
                            </span>
                        </div>


                        {/* Quantity */}
                        <div className="
                    mt-1
                    flex
                    flex-wrap
                    items-center
                    gap-1.5
                    text-[10px]
                    text-slate-500
                    sm:text-xs
                ">
                            <span>
                                Quantity
                            </span>

                            <span className="font-semibold text-slate-300">
                                {expense.quantity} {expense.unit}
                            </span>
                        </div>


                        {/* Total */}
                        <div className="
                    mt-2
                    flex
                    items-center
                    gap-1
                ">
                            <span className="text-[10px] text-slate-500 sm:text-xs">
                                Total
                            </span>

                            <span className="
                        text-sm
                        font-extrabold
                        text-white
                        sm:text-base
                    ">
                                ₹{expense.price * expense.quantity}
                            </span>
                        </div>

                    </div>

                </div>


                {/* Actions */}
                <div className="
            flex
            items-center
            justify-between
            gap-2
            border-t
            border-white/[0.06]
            pt-3
            lg:border-0
            lg:pt-0
        ">

                    {/* Quantity Controller */}
                    <div className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-white/[0.07]
                bg-black/20
                p-1
            ">

                        {/* Minus */}
                        <button
                            onClick={() => onDecrease(expense.id)}
                            disabled={expense.quantity <= 1}
                            className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-red-400/[0.08]
                        text-red-400
                        transition
                        hover:bg-red-400/15
                        active:scale-90
                        disabled:cursor-not-allowed
                        disabled:opacity-30
                    "
                            title="Decrease quantity"
                        >
                            <Minus size={14} />
                        </button>


                        {/* Quantity */}
                        <span className="
                    min-w-[28px]
                    text-center
                    text-xs
                    font-bold
                    text-white
                ">
                            {expense.quantity}
                        </span>


                        {/* Plus */}
                        <button
                            onClick={() => onIncrease(expense.id)}
                            className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-green-400/[0.08]
                        text-green-400
                        transition
                        hover:bg-green-400/15
                        active:scale-90
                    "
                            title="Increase quantity"
                        >
                            <Plus size={14} />
                        </button>

                    </div>


                    {/* Edit */}
                    <button
                        onClick={() => onEdit(expense)}
                        className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-[10px]
                    border
                    border-yellow-400/15
                    bg-yellow-400/[0.06]
                    text-yellow-400
                    transition
                    hover:bg-yellow-400/15
                    active:scale-90
                    sm:h-9
                    sm:w-9
                "
                        title="Edit expense"
                    >
                        <Pencil size={14} />
                    </button>


                    {/* Delete */}
                    <button
                        onClick={() => onDelete(expense.id)}
                        className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-[10px]
                    border
                    border-red-400/15
                    bg-red-400/[0.06]
                    text-red-400
                    transition
                    hover:bg-red-400/15
                    active:scale-90
                    sm:h-9
                    sm:w-9
                "
                        title="Delete expense"
                    >
                        <Trash2 size={14} />
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ExpenseCard;
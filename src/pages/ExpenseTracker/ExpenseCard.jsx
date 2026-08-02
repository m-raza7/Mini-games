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
        rounded-2xl
        bg-white
        p-5
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
        >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Product Details */}

                <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
                        <ShoppingBag
                            size={28}
                            className="text-purple-600"
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-800">
                            {expense.name}
                        </h3>

                        <p className="mt-1 text-gray-500">
                            Price :
                            <span className="ml-2 font-semibold text-green-600">
                                ₹{expense.price}
                            </span>
                        </p>

                        <p className="mt-1 text-gray-500">
                            Quantity :
                            <span className="ml-2 font-semibold">
                                {expense.quantity} {expense.unit}
                            </span>
                        </p>

                        <p className="mt-2 text-lg font-bold text-purple-700">
                            Total : ₹
                            {expense.price * expense.quantity}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}

                <div className="flex flex-wrap items-center gap-3">
                    {/* Minus */}

                    <button
                        onClick={() => onDecrease(expense.id)}
                        disabled={expense.quantity <= 1}
                        className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-red-100
              text-red-600
              transition
              hover:bg-red-200
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
                    >
                        <Minus size={20} />
                    </button>

                    {/* Quantity */}

                    <span className="min-w-[40px] text-center text-xl font-bold">
                        {expense.quantity}
                    </span>

                    {/* Plus */}

                    <button
                        onClick={() => onIncrease(expense.id)}
                        className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-green-100
              text-green-600
              transition
              hover:bg-green-200
            "
                    >
                        <Plus size={20} />
                    </button>

                    {/* Edit */}

                    <button
                        onClick={() => onEdit(expense)}
                        className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-500
              px-4
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-600
            "
                    >
                        <Pencil size={18} />
                        Edit
                    </button>

                    {/* Delete */}

                    <button
                        onClick={() => onDelete(expense.id)}
                        className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-red-500
              px-4
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-600
            "
                    >
                        <Trash2 size={18} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCard;
import {
    Wallet,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

import { formatCurrency } from "../utils/calculations";

const BalanceCard = ({
    balance = 0,
    income = 0,
    expense = 0,
}) => {
    return (
        <div
            className="
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-violet-600/30
                via-purple-600/20
                to-blue-600/20
                p-5
                shadow-2xl
                backdrop-blur-xl
            "
        >
            <div className="
                flex
                items-start
                justify-between
            ">
                <div>
                    <p className="
                        text-sm
                        text-white/60
                    ">
                        Total Balance
                    </p>

                    <h2 className="
                        mt-2
                        text-3xl
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-4xl
                    ">
                        {formatCurrency(
                            balance
                        )}
                    </h2>
                </div>

                <div className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/10
                    text-white
                ">
                    <Wallet size={24} />
                </div>
            </div>

            <div className="
                mt-6
                grid
                grid-cols-2
                gap-3
            ">
                <div className="
                    rounded-2xl
                    border
                    border-emerald-400/10
                    bg-emerald-500/10
                    p-3
                ">
                    <div className="
                        flex
                        items-center
                        gap-2
                        text-emerald-400
                    ">
                        <TrendingUp
                            size={16}
                        />

                        <span className="
                            text-xs
                        ">
                            Income
                        </span>
                    </div>

                    <p className="
                        mt-1
                        font-semibold
                        text-white
                    ">
                        {formatCurrency(
                            income
                        )}
                    </p>
                </div>

                <div className="
                    rounded-2xl
                    border
                    border-red-400/10
                    bg-red-500/10
                    p-3
                ">
                    <div className="
                        flex
                        items-center
                        gap-2
                        text-red-400
                    ">
                        <TrendingDown
                            size={16}
                        />

                        <span className="
                            text-xs
                        ">
                            Expense
                        </span>
                    </div>

                    <p className="
                        mt-1
                        font-semibold
                        text-white
                    ">
                        {formatCurrency(
                            expense
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BalanceCard;
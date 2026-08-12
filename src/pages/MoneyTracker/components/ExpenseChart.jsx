import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

import { formatCurrency } from "../utils/calculations";

const COLORS = [
    "#8b5cf6",
    "#ec4899",
    "#3b82f6",
    "#ef4444",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#f97316",
];

const ExpenseChart = ({
    data = [],
}) => {
    if (!data.length) {
        return (
            <div className="
                flex
                min-h-[280px]
                items-center
                justify-center
                rounded-3xl
                border
                border-white/10
                bg-white/[0.05]
                text-sm
                text-white/40
            ">
                No expense data available
            </div>
        );
    }

    return (
        <div className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.05]
            p-4
        ">
            <h3 className="
                font-semibold
                text-white
            ">
                Expense Breakdown
            </h3>

            <div className="
                mt-4
                h-[260px]
                w-full
            ">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                        >
                            {data.map(
                                (
                                    entry,
                                    index
                                ) => (
                                    <Cell
                                        key={
                                            entry.name
                                        }
                                        fill={
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ]
                                        }
                                    />
                                )
                            )}
                        </Pie>

                        <Tooltip
                            formatter={(
                                value
                            ) =>
                                formatCurrency(
                                    value
                                )
                            }
                            contentStyle={{
                                background:
                                    "#111827",
                                border:
                                    "1px solid rgba(255,255,255,0.1)",
                                borderRadius:
                                    "12px",
                                color: "#fff",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="
                grid
                grid-cols-2
                gap-2
            ">
                {data.map(
                    (item, index) => (
                        <div
                            key={
                                item.name
                            }
                            className="
                                flex
                                items-center
                                justify-between
                                gap-2
                                text-xs
                            "
                        >
                            <div className="
                                flex
                                min-w-0
                                items-center
                                gap-2
                            ">
                                <span
                                    className="
                                        h-2
                                        w-2
                                        shrink-0
                                        rounded-full
                                    "
                                    style={{
                                        backgroundColor:
                                            COLORS[
                                            index %
                                            COLORS.length
                                            ],
                                    }}
                                />

                                <span className="
                                    truncate
                                    text-white/50
                                ">
                                    {item.name}
                                </span>
                            </div>

                            <span className="
                                shrink-0
                                text-white
                            ">
                                {formatCurrency(
                                    item.value
                                )}
                            </span>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ExpenseChart;
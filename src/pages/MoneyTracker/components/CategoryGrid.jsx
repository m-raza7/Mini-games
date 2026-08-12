import {
    expenseCategories,
} from "../data/categories";

const CategoryGrid = ({
    selectedCategory,
    onSelect,
}) => {
    return (
        <div className="
            grid
            grid-cols-3
            gap-2
            sm:grid-cols-4
        ">
            {expenseCategories.map(
                (category) => {
                    const Icon =
                        category.icon;

                    const selected =
                        selectedCategory ===
                        category.name;

                    return (
                        <button
                            key={
                                category.id
                            }
                            type="button"
                            onClick={() =>
                                onSelect(
                                    category.name
                                )
                            }
                            className={`
                                flex
                                flex-col
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                border
                                p-3
                                transition
                                ${selected
                                    ? "border-red-400/40 bg-red-500/10 text-red-400"
                                    : "border-white/10 bg-white/[0.03] text-white/50 hover:bg-white/[0.06]"
                                }
                            `}
                        >
                            <Icon size={20} />

                            <span className="
                                text-[11px]
                                leading-tight
                                text-center
                            ">
                                {
                                    category.name
                                }
                            </span>
                        </button>
                    );
                }
            )}
        </div>
    );
};

export default CategoryGrid;
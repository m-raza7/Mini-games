import {
    ArrowDownAZ,
    ArrowUpAZ,
    Search,
    SlidersHorizontal,
} from "lucide-react";

export default function RecoveryFilters({
    search,
    setSearch,
    status,
    setStatus,
    category,
    setCategory,
    sort,
    setSort,
}) {
    return (
        <div
            className="
        rounded-[22px]
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-3
        shadow-xl
        shadow-black/10
        backdrop-blur-xl
        sm:p-4
    "
        >
            {/* Search */}
            <div className="relative">

                <Search
                    size={17}
                    className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-slate-500
            "
                />

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search person, phone, notes..."
                    className="
                h-11
                w-full
                rounded-[14px]
                border
                border-white/[0.08]
                bg-white/[0.035]
                pl-10
                pr-4
                text-xs
                text-slate-200
                outline-none
                transition-all
                placeholder:text-slate-600
                focus:border-emerald-400/40
                focus:bg-white/[0.05]
                focus:ring-2
                focus:ring-emerald-400/10
                sm:text-sm
            "
                />

            </div>


            {/* Filters */}
            <div
                className="
            mt-3
            grid
            grid-cols-1
            gap-2
            sm:grid-cols-2
            lg:flex
            lg:flex-wrap
        "
            >

                {/* Status */}
                <div className="relative">

                    <SlidersHorizontal
                        size={14}
                        className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                "
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="
                    h-10
                    w-full
                    appearance-none
                    rounded-[13px]
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    pl-9
                    pr-8
                    text-xs
                    font-medium
                    text-slate-300
                    outline-none
                    transition
                    focus:border-emerald-400/40
                    focus:ring-2
                    focus:ring-emerald-400/10
                    lg:w-auto
                "
                    >
                        <option
                            value="all"
                            className="bg-slate-900"
                        >
                            All Status
                        </option>

                        <option
                            value="pending"
                            className="bg-slate-900"
                        >
                            Pending
                        </option>

                        <option
                            value="overdue"
                            className="bg-slate-900"
                        >
                            Overdue
                        </option>

                        <option
                            value="completed"
                            className="bg-slate-900"
                        >
                            Completed
                        </option>
                    </select>

                </div>


                {/* Category */}
                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="
                h-10
                w-full
                rounded-[13px]
                border
                border-white/[0.08]
                bg-white/[0.035]
                px-3
                text-xs
                font-medium
                text-slate-300
                outline-none
                transition
                focus:border-emerald-400/40
                focus:ring-2
                focus:ring-emerald-400/10
                lg:w-auto
            "
                >
                    <option
                        value="all"
                        className="bg-slate-900"
                    >
                        All Categories
                    </option>

                    <option
                        value="Personal"
                        className="bg-slate-900"
                    >
                        Personal
                    </option>

                    <option
                        value="Family"
                        className="bg-slate-900"
                    >
                        Family
                    </option>

                    <option
                        value="Friend"
                        className="bg-slate-900"
                    >
                        Friend
                    </option>

                    <option
                        value="Business"
                        className="bg-slate-900"
                    >
                        Business
                    </option>

                    <option
                        value="Emergency"
                        className="bg-slate-900"
                    >
                        Emergency
                    </option>

                    <option
                        value="Other"
                        className="bg-slate-900"
                    >
                        Other
                    </option>
                </select>


                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) =>
                        setSort(e.target.value)
                    }
                    className="
                h-10
                w-full
                rounded-[13px]
                border
                border-white/[0.08]
                bg-white/[0.035]
                px-3
                text-xs
                font-medium
                text-slate-300
                outline-none
                transition
                focus:border-emerald-400/40
                focus:ring-2
                focus:ring-emerald-400/10
                lg:w-auto
            "
                >
                    <option
                        value="newest"
                        className="bg-slate-900"
                    >
                        Newest First
                    </option>

                    <option
                        value="oldest"
                        className="bg-slate-900"
                    >
                        Oldest First
                    </option>

                    <option
                        value="amountHigh"
                        className="bg-slate-900"
                    >
                        Amount: High to Low
                    </option>

                    <option
                        value="amountLow"
                        className="bg-slate-900"
                    >
                        Amount: Low to High
                    </option>

                    <option
                        value="dueSoon"
                        className="bg-slate-900"
                    >
                        Due Date
                    </option>
                </select>

            </div>
        </div>
    );
}
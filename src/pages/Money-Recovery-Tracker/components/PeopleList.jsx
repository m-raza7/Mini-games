import {
    ArrowRight,
    UserRound,
} from "lucide-react";

import {
    getPaidAmount,
} from "../utils/calculations";

import {
    formatCurrency,
    getInitials,
} from "../utils/formatters";

export default function PeopleList({
    recoveries,
    onSelect,
}) {
    const people = Object.values(
        recoveries.reduce((acc, item) => {
            const key =
                item.phone ||
                item.personName?.trim().toLowerCase();

            if (!key) return acc;

            if (!acc[key]) {
                acc[key] = {
                    name: item.personName,
                    phone: item.phone,
                    total: 0,
                    recovered: 0,

                    // Keep original recovery records
                    recoveries: [],
                };
            }

            acc[key].total += Number(
                item.amount || 0
            );

            acc[key].recovered += getPaidAmount(
                item
            );

            // Store original recovery
            acc[key].recoveries.push(item);

            return acc;
        }, {})
    );

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
            <div className="flex items-center justify-between">

                <div className="min-w-0">
                    <h2
                        className="
                            text-sm
                            font-bold
                            text-white
                            sm:text-base
                        "
                    >
                        People
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
                        See how much each person needs to return.
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
                    <UserRound size={17} />
                </div>
            </div>

            {/* People List */}
            <div className="mt-4 space-y-1.5">

                {/* Empty State */}
                {!people.length && (
                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-[18px]
                            border
                            border-dashed
                            border-white/[0.08]
                            bg-white/[0.015]
                            px-4
                            py-8
                            text-center
                        "
                    >
                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                bg-white/[0.04]
                                text-slate-600
                            "
                        >
                            <UserRound size={20} />
                        </div>

                        <p
                            className="
                                mt-3
                                text-xs
                                font-medium
                                text-slate-500
                            "
                        >
                            No people available.
                        </p>
                    </div>
                )}

                {/* People */}
                {people.slice(0, 5).map((person) => {

                    const remaining =
                        Math.max(
                            0,
                            person.total -
                            person.recovered
                        );

                    /*
                     * Find the most relevant recovery.
                     *
                     * Prefer an unpaid/partially paid recovery.
                     * Otherwise use the latest recovery.
                     */
                    const selectedRecovery =
                        [...person.recoveries]
                            .sort((a, b) => {
                                const aRemaining =
                                    Number(a.amount || 0) -
                                    getPaidAmount(a);

                                const bRemaining =
                                    Number(b.amount || 0) -
                                    getPaidAmount(b);

                                // Unpaid/remaining first
                                if (
                                    aRemaining > 0 &&
                                    bRemaining <= 0
                                ) {
                                    return -1;
                                }

                                if (
                                    bRemaining > 0 &&
                                    aRemaining <= 0
                                ) {
                                    return 1;
                                }

                                // Otherwise newest first
                                return (
                                    new Date(
                                        b.givenDate || 0
                                    ) -
                                    new Date(
                                        a.givenDate || 0
                                    )
                                );
                            })[0];

                    return (
                        <button
                            key={person.phone || person.name}
                            type="button"
                            onClick={() => onSelect(person)}
                            className="
                                group
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-[16px]
                                border
                                border-transparent
                                p-2.5
                                text-left
                                transition-all
                                duration-200
                                hover:border-white/[0.06]
                                hover:bg-white/[0.035]
                                active:scale-[0.98]
                                focus:outline-none
                                focus:ring-2
                                focus:ring-emerald-500/30
                            "
                        >
                            {/* Avatar */}
                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-emerald-400/10
                                    bg-emerald-400/[0.08]
                                    text-[10px]
                                    font-bold
                                    text-emerald-400
                                    sm:h-10
                                    sm:w-10
                                    sm:text-xs
                                "
                            >
                                {getInitials(
                                    person.name
                                )}
                            </div>

                            {/* Person Info */}
                            <div className="min-w-0 flex-1">

                                <p
                                    className="
                                        truncate
                                        text-xs
                                        font-semibold
                                        text-slate-200
                                        sm:text-sm
                                    "
                                >
                                    {person.name}
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-[10px]
                                        text-slate-500
                                        sm:text-xs
                                    "
                                >
                                    {formatCurrency(
                                        remaining
                                    )}{" "}
                                    remaining
                                </p>
                            </div>

                            {/* Amount */}
                            <div
                                className="
                                    hidden
                                    text-right
                                    sm:block
                                "
                            >
                                <p
                                    className="
                                        text-xs
                                        font-bold
                                        text-emerald-400
                                    "
                                >
                                    {formatCurrency(
                                        remaining
                                    )}
                                </p>
                            </div>

                            {/* Arrow */}
                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/[0.06]
                                    bg-white/[0.03]
                                    text-slate-500
                                    transition-all
                                    duration-200

                                    group-hover:border-emerald-400/20
                                    group-hover:bg-emerald-400/10
                                    group-hover:text-emerald-400

                                    group-active:scale-90
                                "
                            >
                                <ArrowRight
                                    size={15}
                                    strokeWidth={2}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
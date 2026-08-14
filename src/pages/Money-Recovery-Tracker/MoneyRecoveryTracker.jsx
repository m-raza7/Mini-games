import { useMemo, useState } from "react";

import {
    MoneyRecoveryProvider,
    useMoneyRecovery,
} from "./context/MoneyRecoveryContext";

import MoneyRecoveryHeader from "./components/MoneyRecoveryHeader";
import SummaryCards from "./components/SummaryCards";
import RecoveryCard from "./components/RecoveryCard";
import RecoveryForm from "./components/RecoveryForm";
import PaymentModal from "./components/PaymentModal";
import RecoveryDetails from "./components/RecoveryDetails";
import RecoveryFilters from "./components/RecoveryFilters";
import PeopleList from "./components/PeopleList";
import PeopleDetails from "./components/PeopleDetails";
import Reports from "./components/Reports";
import EmptyState from "./components/EmptyState";

import {
    calculateStats,
    getPaidAmount,
    getRemainingAmount,
    getRecoveryStatus,
} from "./utils/calculations";


/* =========================================================
   DASHBOARD
========================================================= */

function MoneyRecoveryDashboard() {
    const {
        recoveries,
        addRecovery,
        updateRecovery,
        deleteRecovery,
        addPayment,
        deletePayment,
    } = useMoneyRecovery();


    /* =========================================================
       MODAL STATE
    ========================================================= */

    const [formOpen, setFormOpen] = useState(false);

    const [editingRecovery, setEditingRecovery] =
        useState(null);

    const [paymentRecovery, setPaymentRecovery] =
        useState(null);

    const [detailsRecovery, setDetailsRecovery] =
        useState(null);

    /*
     * Store only the identity/key of the selected person.
     */
    const [selectedPersonKey, setSelectedPersonKey] =
        useState(null);


    /* =========================================================
       FILTER STATE
    ========================================================= */

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("newest");


    /* =========================================================
       STATS
    ========================================================= */

    const stats = useMemo(() => {
        return calculateStats(recoveries);
    }, [recoveries]);


    /* =========================================================
       PERSON KEY
    ========================================================= */

    const getPersonKey = (person) => {
        if (!person) return null;

        const phone = person.phone
            ?.toString()
            .trim()
            .toLowerCase();

        if (phone) {
            return `phone:${phone}`;
        }

        const name = person.name
            ?.toString()
            .trim()
            .toLowerCase();

        if (name) {
            return `name:${name}`;
        }

        return null;
    };


    /* =========================================================
       SELECT PERSON
    ========================================================= */

    const handlePersonSelect = (person) => {
        const key = getPersonKey(person);

        if (!key) return;

        /*
         * Make sure RecoveryDetails is closed
         * before opening PeopleDetails.
         */
        setDetailsRecovery(null);
        setSelectedPersonKey(key);
    };


    /* =========================================================
       CLOSE PEOPLE DETAILS
    ========================================================= */

    const closePeopleDetails = () => {
        setSelectedPersonKey(null);
    };


    /* =========================================================
       FIND SELECTED PERSON
    ========================================================= */

    const selectedPersonData = useMemo(() => {
        if (!selectedPersonKey) {
            return null;
        }

        const personRecoveries = recoveries.filter(
            (item) => {
                const phone =
                    item.phone
                        ?.toString()
                        .trim()
                        .toLowerCase();

                const name =
                    item.personName
                        ?.toString()
                        .trim()
                        .toLowerCase();

                if (
                    selectedPersonKey.startsWith(
                        "phone:"
                    )
                ) {
                    return (
                        `phone:${phone}` ===
                        selectedPersonKey
                    );
                }

                if (
                    selectedPersonKey.startsWith(
                        "name:"
                    )
                ) {
                    return (
                        `name:${name}` ===
                        selectedPersonKey
                    );
                }

                return false;
            }
        );

        if (!personRecoveries.length) {
            return null;
        }

        const firstRecovery =
            personRecoveries[0];

        const total =
            personRecoveries.reduce(
                (sum, item) => {
                    return (
                        sum +
                        Number(
                            item.amount || 0
                        )
                    );
                },
                0
            );

        const recovered =
            personRecoveries.reduce(
                (sum, item) => {
                    return (
                        sum +
                        getPaidAmount(item)
                    );
                },
                0
            );

        return {
            name:
                firstRecovery.personName ||
                "Unknown Person",

            phone:
                firstRecovery.phone || "",

            total,

            recovered,

            remaining: Math.max(
                total - recovered,
                0
            ),

            recoveries: personRecoveries,
        };
    }, [
        recoveries,
        selectedPersonKey,
    ]);


    /* =========================================================
       SEARCH / FILTER / SORT
    ========================================================= */

    const filteredRecoveries = useMemo(() => {
        let data = [...recoveries];

        /* -------------------------
           SEARCH
        ------------------------- */

        const searchQuery =
            search.trim().toLowerCase();

        if (searchQuery) {
            data = data.filter((item) => {
                const searchableValues = [
                    item.personName,
                    item.phone,
                    item.address,
                    item.notes,
                    item.category,
                ];

                return searchableValues
                    .filter(Boolean)
                    .some((value) =>
                        String(value)
                            .toLowerCase()
                            .includes(
                                searchQuery
                            )
                    );
            });
        }


        /* -------------------------
           STATUS
        ------------------------- */

        if (status !== "all") {
            data = data.filter(
                (item) =>
                    getRecoveryStatus(item) ===
                    status
            );
        }


        /* -------------------------
           CATEGORY
        ------------------------- */

        if (category !== "all") {
            data = data.filter(
                (item) =>
                    item.category ===
                    category
            );
        }


        /* -------------------------
           SORT
        ------------------------- */

        data.sort((a, b) => {
            switch (sort) {
                case "newest":
                    return (
                        new Date(
                            b.createdAt || 0
                        ) -
                        new Date(
                            a.createdAt || 0
                        )
                    );

                case "oldest":
                    return (
                        new Date(
                            a.createdAt || 0
                        ) -
                        new Date(
                            b.createdAt || 0
                        )
                    );

                case "amountHigh":
                    return (
                        Number(
                            b.amount || 0
                        ) -
                        Number(
                            a.amount || 0
                        )
                    );

                case "amountLow":
                    return (
                        Number(
                            a.amount || 0
                        ) -
                        Number(
                            b.amount || 0
                        )
                    );

                case "dueSoon": {
                    const dateA =
                        a.dueDate
                            ? new Date(
                                a.dueDate
                            ).getTime()
                            : Infinity;

                    const dateB =
                        b.dueDate
                            ? new Date(
                                b.dueDate
                            ).getTime()
                            : Infinity;

                    return dateA - dateB;
                }

                default:
                    return 0;
            }
        });

        return data;
    }, [
        recoveries,
        search,
        status,
        category,
        sort,
    ]);


    /* =========================================================
       ADD RECOVERY
    ========================================================= */

    const openAdd = () => {
        setDetailsRecovery(null);
        setSelectedPersonKey(null);
        setEditingRecovery(null);
        setFormOpen(true);
    };


    /* =========================================================
       EDIT RECOVERY
    ========================================================= */

    const openEdit = (recovery) => {
        if (!recovery) return;

        setSelectedPersonKey(null);
        setDetailsRecovery(null);

        setEditingRecovery(recovery);
        setFormOpen(true);
    };


    /* =========================================================
       SAVE RECOVERY
    ========================================================= */

    const handleSave = (form) => {
        if (!form) return;

        if (editingRecovery) {
            updateRecovery(
                editingRecovery.id,
                form
            );
        } else {
            addRecovery(form);
        }

        setFormOpen(false);
        setEditingRecovery(null);
    };


    /* =========================================================
       DELETE RECOVERY
    ========================================================= */

    const handleDelete = (recovery) => {
        if (!recovery) return;

        const confirmed =
            window.confirm(
                `Delete recovery record for ${recovery.personName}?`
            );

        if (!confirmed) return;

        deleteRecovery(recovery.id);

        setDetailsRecovery(null);
    };


    /* =========================================================
       DELETE PAYMENT
    ========================================================= */

    const handleDeletePayment = (
        recovery,
        paymentId
    ) => {
        if (
            !recovery ||
            !paymentId
        ) {
            return;
        }

        const confirmed =
            window.confirm(
                "Delete this payment?"
            );

        if (!confirmed) return;

        deletePayment(
            recovery.id,
            paymentId
        );

        /*
         * Let context update the data.
         * Close the modal instead of using stale data.
         */
        setDetailsRecovery(null);
    };


    /* =========================================================
       ADD PAYMENT
    ========================================================= */

    const handleAddPayment = (
        payment
    ) => {
        if (
            !paymentRecovery ||
            !payment
        ) {
            return;
        }

        addPayment(
            paymentRecovery.id,
            payment
        );

        setPaymentRecovery(null);
    };


    /* =========================================================
       CLOSE FORM
    ========================================================= */

    const closeForm = () => {
        setFormOpen(false);
        setEditingRecovery(null);
    };


    /* =========================================================
       SELECT RECOVERY FROM PEOPLE DETAILS
    ========================================================= */

    const handleSelectRecovery = (
        recovery
    ) => {
        if (!recovery) return;

        /*
         * IMPORTANT:
         *
         * Close PeopleDetails first.
         */
        setSelectedPersonKey(null);

        /*
         * Open RecoveryDetails.
         *
         * Since selectedPersonKey becomes null,
         * PeopleDetails disappears.
         */
        setDetailsRecovery(recovery);
    };


    /* =========================================================
       RENDER
    ========================================================= */

    return (
        <main
            className="
                min-h-screen
                bg-[#070b14]
                pt-16
                text-slate-200
            "
        >

            {/* =================================================
                BACKGROUND GLOW
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    -z-0
                    overflow-hidden
                "
            >
                <div
                    className="
                        absolute
                        -left-32
                        top-20
                        h-72
                        w-72
                        rounded-full
                        bg-emerald-500/[0.06]
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        -right-32
                        top-1/3
                        h-80
                        w-80
                        rounded-full
                        bg-cyan-500/[0.04]
                        blur-3xl
                    "
                />
            </div>


            {/* =================================================
                PAGE CONTAINER
            ================================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-[1500px]
                    px-3
                    py-4
                    sm:px-5
                    sm:py-5
                    lg:px-8
                    lg:py-7
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <MoneyRecoveryHeader
                    onAdd={openAdd}
                    onImport={() => {
                        window.location.reload();
                    }}
                />


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="mt-5 sm:mt-6">
                    <SummaryCards
                        stats={stats}
                    />
                </div>


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <div
                    className="
                        mt-5
                        grid
                        gap-4
                        xl:grid-cols-[minmax(0,1fr)_340px]
                        xl:gap-5
                    "
                >

                    {/* =================================================
                        RECOVERIES
                    ================================================= */}

                    <section className="min-w-0">

                        <div className="mb-4">

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >

                                <div>

                                    <h2
                                        className="
                                            text-base
                                            font-bold
                                            tracking-tight
                                            text-white
                                            sm:text-lg
                                        "
                                    >
                                        Money Recoveries
                                    </h2>

                                    <p
                                        className="
                                            mt-1
                                            text-[11px]
                                            text-slate-500
                                            sm:text-xs
                                        "
                                    >
                                        {
                                            filteredRecoveries.length
                                        }{" "}
                                        {filteredRecoveries.length ===
                                            1
                                            ? "record"
                                            : "records"}{" "}
                                        found
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Filters */}

                        <RecoveryFilters
                            search={search}
                            setSearch={setSearch}
                            status={status}
                            setStatus={setStatus}
                            category={category}
                            setCategory={
                                setCategory
                            }
                            sort={sort}
                            setSort={setSort}
                        />


                        {/* Recovery Cards */}

                        <div className="mt-4 space-y-3">

                            {!filteredRecoveries.length ? (

                                <EmptyState
                                    onAdd={openAdd}
                                    hasFilters={Boolean(
                                        search ||
                                        status !==
                                        "all" ||
                                        category !==
                                        "all"
                                    )}
                                />

                            ) : (

                                filteredRecoveries.map(
                                    (
                                        recovery
                                    ) => (

                                        <RecoveryCard
                                            key={
                                                recovery.id
                                            }
                                            recovery={
                                                recovery
                                            }
                                            paid={getPaidAmount(
                                                recovery
                                            )}
                                            remaining={getRemainingAmount(
                                                recovery
                                            )}
                                            status={getRecoveryStatus(
                                                recovery
                                            )}
                                            onPayment={
                                                setPaymentRecovery
                                            }
                                            onDetails={
                                                setDetailsRecovery
                                            }
                                        />

                                    )
                                )

                            )}

                        </div>

                    </section>


                    {/* =================================================
                        SIDEBAR
                    ================================================= */}

                    <aside
                        className="
                            space-y-4
                            xl:space-y-5
                        "
                    >

                        <PeopleList
                            recoveries={
                                recoveries
                            }
                            onSelect={
                                handlePersonSelect
                            }
                        />

                        <Reports
                            stats={stats}
                        />

                    </aside>

                </div>

            </div>


            {/* =========================================================
                RECOVERY FORM
            ========================================================== */}

            <RecoveryForm
                open={formOpen}
                onClose={closeForm}
                onSave={handleSave}
                editingRecovery={
                    editingRecovery
                }
            />


            {/* =========================================================
                PAYMENT MODAL
            ========================================================== */}

            <PaymentModal
                open={Boolean(
                    paymentRecovery
                )}
                recovery={
                    paymentRecovery
                }
                remaining={
                    paymentRecovery
                        ? getRemainingAmount(
                            paymentRecovery
                        )
                        : 0
                }
                onClose={() =>
                    setPaymentRecovery(
                        null
                    )
                }
                onSave={
                    handleAddPayment
                }
            />


            {/* =========================================================
                RECOVERY DETAILS

                Only render when a recovery exists.
            ========================================================== */}

            {detailsRecovery && (
                <RecoveryDetails
                    key={`recovery-details-${detailsRecovery.id}`}
                    open={true}
                    recovery={
                        detailsRecovery
                    }
                    paid={getPaidAmount(
                        detailsRecovery
                    )}
                    remaining={getRemainingAmount(
                        detailsRecovery
                    )}
                    onClose={() =>
                        setDetailsRecovery(
                            null
                        )
                    }
                    onEdit={() => {
                        openEdit(
                            detailsRecovery
                        );
                    }}
                    onDelete={() => {
                        handleDelete(
                            detailsRecovery
                        );
                    }}
                    onDeletePayment={(
                        paymentId
                    ) => {
                        handleDeletePayment(
                            detailsRecovery,
                            paymentId
                        );
                    }}
                />
            )}


            {/* =========================================================
                PEOPLE DETAILS

                Only render when a person exists.
            ========================================================== */}

            {selectedPersonData && (
                <PeopleDetails
                    key={`people-details-${selectedPersonKey}`}
                    open={true}
                    person={
                        selectedPersonData
                    }
                    recoveries={
                        selectedPersonData.recoveries ||
                        []
                    }
                    onClose={
                        closePeopleDetails
                    }
                    onSelectRecovery={
                        handleSelectRecovery
                    }
                />
            )}

        </main>
    );
}


/* =========================================================
   PROVIDER WRAPPER
========================================================= */

export default function MoneyRecoveryTracker() {
    return (
        <MoneyRecoveryProvider>
            <MoneyRecoveryDashboard />
        </MoneyRecoveryProvider>
    );
}
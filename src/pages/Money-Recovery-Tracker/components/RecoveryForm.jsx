import { useEffect, useState } from "react";
import {
    CalendarDays,
    Clock,
    MapPin,
    Phone,
    User,
    X,
} from "lucide-react";

const initialForm = {
    personName: "",
    phone: "",
    address: "",
    amount: "",
    givenDate: new Date()
        .toISOString()
        .slice(0, 10),
    givenTime: new Date()
        .toTimeString()
        .slice(0, 5),
    dueDate: "",
    dueTime: "18:00",
    category: "Personal",
    notes: "",
};

export default function RecoveryForm({
    open,
    onClose,
    onSave,
    editingRecovery,
}) {
    const [form, setForm] =
        useState(initialForm);

    useEffect(() => {
        if (editingRecovery) {
            setForm({
                personName:
                    editingRecovery.personName || "",
                phone:
                    editingRecovery.phone || "",
                address:
                    editingRecovery.address || "",
                amount:
                    editingRecovery.amount || "",
                givenDate:
                    editingRecovery.givenDate || "",
                givenTime:
                    editingRecovery.givenTime || "",
                dueDate:
                    editingRecovery.dueDate || "",
                dueTime:
                    editingRecovery.dueTime || "18:00",
                category:
                    editingRecovery.category ||
                    "Personal",
                notes:
                    editingRecovery.notes || "",
            });
        } else {
            setForm(initialForm);
        }
    }, [editingRecovery, open]);

    if (!open) return null;

    const update = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !form.personName.trim() ||
            !form.amount ||
            Number(form.amount) <= 0 ||
            !form.givenDate ||
            !form.dueDate
        ) {
            alert(
                "Please fill all required fields."
            );
            return;
        }

        onSave(form);
        setForm(initialForm);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#020617]/80 p-0 backdrop-blur-md sm:items-center sm:p-4">

            <div className="
        flex
        max-h-[94vh]
        w-full
        flex-col
        overflow-hidden
        rounded-t-[26px]
        border
        border-white/[0.08]
        bg-[#0b1120]
        text-white
        shadow-2xl
        shadow-black/50
        sm:max-w-2xl
        sm:rounded-[26px]
    ">

                {/* Header */}
                <div className="
            sticky
            top-0
            z-10
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/[0.08]
            bg-[#0b1120]/95
            px-4
            py-4
            backdrop-blur-xl
            sm:px-6
            sm:py-5
        ">

                    <div className="flex min-w-0 items-center gap-3">

                        {/* Icon */}
                        <div className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-[13px]
                    border
                    border-emerald-400/20
                    bg-emerald-400/10
                    text-emerald-400
                ">
                            <span className="text-lg">
                                {editingRecovery ? "✏️" : "💰"}
                            </span>
                        </div>

                        <div className="min-w-0">

                            <h2 className="
                        truncate
                        text-base
                        font-bold
                        text-white
                        sm:text-xl
                    ">
                                {editingRecovery
                                    ? "Edit Recovery"
                                    : "Add Money Recovery"}
                            </h2>

                            <p className="
                        mt-0.5
                        text-[9px]
                        text-slate-500
                        sm:text-xs
                    ">
                                Record money given to another person
                            </p>

                        </div>

                    </div>


                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-slate-400
                    transition
                    hover:bg-red-400/10
                    hover:text-red-400
                    active:scale-90
                    sm:h-10
                    sm:w-10
                "
                    >
                        <X size={18} />
                    </button>

                </div>


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="
                min-h-0
                flex-1
                space-y-5
                overflow-y-auto
                p-4
                sm:p-6
            "
                >

                    {/* Basic Information */}
                    <div className="grid gap-4 sm:grid-cols-2">

                        {/* Person Name */}
                        <div className="sm:col-span-2">

                            <label className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-400
                    ">
                                Person Name *
                            </label>

                            <div className="relative">

                                <User
                                    size={16}
                                    className="
                                pointer-events-none
                                absolute
                                left-3.5
                                top-1/2
                                -translate-y-1/2
                                text-slate-600
                            "
                                />

                                <input
                                    required
                                    value={form.personName}
                                    onChange={(e) =>
                                        update(
                                            "personName",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter name..."
                                    className="
                                h-11
                                w-full
                                rounded-[16px]
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                pl-10
                                pr-4
                                text-xs
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-600
                                focus:border-emerald-400/40
                                focus:bg-emerald-400/[0.03]
                                sm:h-12
                                sm:text-sm
                            "
                                />

                            </div>

                        </div>


                        {/* Phone */}
                        <div>

                            <label className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-400
                    ">
                                Phone Number
                            </label>

                            <div className="relative">

                                <Phone
                                    size={16}
                                    className="
                                pointer-events-none
                                absolute
                                left-3.5
                                top-1/2
                                -translate-y-1/2
                                text-slate-600
                            "
                                />

                                <input
                                    value={form.phone}
                                    onChange={(e) =>
                                        update(
                                            "phone",
                                            e.target.value
                                        )
                                    }
                                    placeholder="+91 000 000 0000"
                                    inputMode="numeric"
                                    className="
                                h-11
                                w-full
                                rounded-[16px]
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                pl-10
                                pr-4
                                text-xs
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-600
                                focus:border-emerald-400/40
                                sm:h-12
                                sm:text-sm
                            "
                                />

                            </div>

                        </div>


                        {/* Address */}
                        <div>

                            <label className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-400
                    ">
                                Address
                            </label>

                            <div className="relative">

                                <MapPin
                                    size={16}
                                    className="
                                pointer-events-none
                                absolute
                                left-3.5
                                top-1/2
                                -translate-y-1/2
                                text-slate-600
                            "
                                />

                                <input
                                    value={form.address}
                                    onChange={(e) =>
                                        update(
                                            "address",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter address..."
                                    className="
                                h-11
                                w-full
                                rounded-[16px]
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                pl-10
                                pr-4
                                text-xs
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-600
                                focus:border-emerald-400/40
                                sm:h-12
                                sm:text-sm
                            "
                                />

                            </div>

                        </div>


                        {/* Amount */}
                        <div>

                            <label className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-400
                    ">
                                Amount *
                            </label>

                            <div className="relative">

                                <span className="
                            absolute
                            left-3.5
                            top-1/2
                            -translate-y-1/2
                            text-sm
                            font-bold
                            text-emerald-400
                        ">
                                    ₹
                                </span>

                                <input
                                    required
                                    type="number"
                                    min="1"
                                    value={form.amount}
                                    onChange={(e) =>
                                        update(
                                            "amount",
                                            e.target.value
                                        )
                                    }
                                    placeholder="5000"
                                    className="
                                h-11
                                w-full
                                rounded-[16px]
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                pl-9
                                pr-4
                                text-xs
                                font-semibold
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-600
                                focus:border-emerald-400/40
                                focus:bg-emerald-400/[0.03]
                                sm:h-12
                                sm:text-sm
                            "
                                />

                            </div>

                        </div>


                        {/* Category */}
                        <div>

                            <label className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-400
                    ">
                                Category
                            </label>

                            <select
                                value={form.category}
                                onChange={(e) =>
                                    update(
                                        "category",
                                        e.target.value
                                    )
                                }
                                className="
                            h-11
                            w-full
                            cursor-pointer
                            rounded-[16px]
                            border
                            border-white/[0.08]
                            bg-[#111827]
                            px-4
                            text-xs
                            text-white
                            outline-none
                            transition
                            focus:border-emerald-400/40
                            sm:h-12
                            sm:text-sm
                        "
                            >
                                <option>Personal</option>
                                <option>Family</option>
                                <option>Friend</option>
                                <option>Business</option>
                                <option>Emergency</option>
                                <option>Other</option>
                            </select>

                        </div>

                    </div>


                    {/* Given Information */}
                    <div className="
                rounded-[20px]
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-4
                sm:p-5
            ">

                        <div className="mb-4 flex items-center gap-2">

                            <div className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-blue-400/10
                        text-blue-400
                    ">
                                <CalendarDays size={14} />
                            </div>

                            <div>

                                <h3 className="
                            text-xs
                            font-bold
                            text-slate-300
                        ">
                                    Given Information
                                </h3>

                                <p className="
                            mt-0.5
                            text-[9px]
                            text-slate-600
                        ">
                                    When the money was given
                                </p>

                            </div>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Given Date */}
                            <div>

                                <label className="
                            mb-2
                            block
                            text-[10px]
                            font-semibold
                            text-slate-500
                        ">
                                    Given Date *
                                </label>

                                <div className="relative">

                                    <CalendarDays
                                        size={15}
                                        className="
                                    pointer-events-none
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-600
                                "
                                    />

                                    <input
                                        required
                                        type="date"
                                        value={form.givenDate}
                                        onChange={(e) =>
                                            update(
                                                "givenDate",
                                                e.target.value
                                            )
                                        }
                                        className="
                                    h-10
                                    w-full
                                    rounded-[14px]
                                    border
                                    border-white/[0.07]
                                    bg-white/[0.035]
                                    pl-9
                                    pr-3
                                    text-xs
                                    text-white
                                    outline-none
                                    focus:border-emerald-400/40
                                "
                                    />

                                </div>

                            </div>


                            {/* Given Time */}
                            <div>

                                <label className="
                            mb-2
                            block
                            text-[10px]
                            font-semibold
                            text-slate-500
                        ">
                                    Given Time
                                </label>

                                <div className="relative">

                                    <Clock
                                        size={15}
                                        className="
                                    pointer-events-none
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-600
                                "
                                    />

                                    <input
                                        type="time"
                                        value={form.givenTime}
                                        onChange={(e) =>
                                            update(
                                                "givenTime",
                                                e.target.value
                                            )
                                        }
                                        className="
                                    h-10
                                    w-full
                                    rounded-[14px]
                                    border
                                    border-white/[0.07]
                                    bg-white/[0.035]
                                    pl-9
                                    pr-3
                                    text-xs
                                    text-white
                                    outline-none
                                    focus:border-emerald-400/40
                                "
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Recovery Due */}
                    <div className="
                rounded-[20px]
                border
                border-emerald-400/10
                bg-emerald-400/[0.035]
                p-4
                sm:p-5
            ">

                        <div className="mb-4 flex items-center gap-2">

                            <div className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-emerald-400/10
                        text-emerald-400
                    ">
                                <Clock size={14} />
                            </div>

                            <div>

                                <h3 className="
                            text-xs
                            font-bold
                            text-slate-300
                        ">
                                    Recovery Due
                                </h3>

                                <p className="
                            mt-0.5
                            text-[9px]
                            text-slate-600
                        ">
                                    Set when you expect the money back
                                </p>

                            </div>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            {/* Due Date */}
                            <div>

                                <label className="
                            mb-2
                            block
                            text-[10px]
                            font-semibold
                            text-slate-500
                        ">
                                    Due Date *
                                </label>

                                <input
                                    required
                                    type="date"
                                    value={form.dueDate}
                                    onChange={(e) =>
                                        update(
                                            "dueDate",
                                            e.target.value
                                        )
                                    }
                                    className="
                                h-10
                                w-full
                                rounded-[14px]
                                border
                                border-white/[0.07]
                                bg-white/[0.035]
                                px-3
                                text-xs
                                text-white
                                outline-none
                                focus:border-emerald-400/40
                            "
                                />

                            </div>


                            {/* Due Time */}
                            <div>

                                <label className="
                            mb-2
                            block
                            text-[10px]
                            font-semibold
                            text-slate-500
                        ">
                                    Due Time
                                </label>

                                <input
                                    type="time"
                                    value={form.dueTime}
                                    onChange={(e) =>
                                        update(
                                            "dueTime",
                                            e.target.value
                                        )
                                    }
                                    className="
                                h-10
                                w-full
                                rounded-[14px]
                                border
                                border-white/[0.07]
                                bg-white/[0.035]
                                px-3
                                text-xs
                                text-white
                                outline-none
                                focus:border-emerald-400/40
                            "
                                />

                            </div>

                        </div>

                    </div>


                    {/* Notes */}
                    <div>

                        <label className="
                    mb-2
                    block
                    text-xs
                    font-semibold
                    text-slate-400
                ">
                            Notes
                        </label>

                        <textarea
                            rows="3"
                            value={form.notes}
                            onChange={(e) =>
                                update(
                                    "notes",
                                    e.target.value
                                )
                            }
                            placeholder="Took money for emergency..."
                            className="
                        w-full
                        resize-none
                        rounded-[16px]
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        px-4
                        py-3
                        text-xs
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-600
                        focus:border-emerald-400/40
                        focus:bg-emerald-400/[0.03]
                        sm:text-sm
                    "
                        />

                    </div>


                    {/* Footer */}
                    <div className="
                sticky
                bottom-0
                -mx-4
                flex
                flex-col-reverse
                gap-2
                border-t
                border-white/[0.08]
                bg-[#0b1120]/95
                px-4
                pb-1
                pt-4
                backdrop-blur-xl
                sm:-mx-6
                sm:flex-row
                sm:justify-end
                sm:px-6
            ">

                        {/* Cancel */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="
                        min-h-[42px]
                        w-full
                        rounded-full
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        px-6
                        text-xs
                        font-semibold
                        text-slate-400
                        transition
                        hover:bg-white/[0.07]
                        hover:text-white
                        active:scale-95
                        sm:w-auto
                    "
                        >
                            Cancel
                        </button>


                        {/* Save */}
                        <button
                            type="submit"
                            className="
                        min-h-[42px]
                        w-full
                        rounded-full
                        bg-gradient-to-r
                        from-emerald-500
                        to-green-500
                        px-7
                        text-xs
                        font-bold
                        text-white
                        shadow-lg
                        shadow-emerald-500/20
                        transition
                        hover:from-emerald-400
                        hover:to-green-400
                        active:scale-95
                        sm:w-auto
                    "
                        >
                            {editingRecovery
                                ? "Update Recovery"
                                : "Save Recovery"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
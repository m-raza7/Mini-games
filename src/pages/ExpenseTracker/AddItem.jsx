import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
    name: "",
    category: "Shopping",
    price: "",
    quantity: 1,
    unit: "piece",
};

const AddItem = ({
    isOpen,
    onClose,
    onSave,
    editingItem,
}) => {
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (!isOpen) return;

        if (editingItem) {
            setFormData({
                name: editingItem.name || "",
                category: editingItem.category || "Shopping",
                price: editingItem.price || "",
                quantity: editingItem.quantity || 1,
                unit: editingItem.unit || "piece",
            });
        } else {
            setFormData(initialForm);
        }
    }, [editingItem, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,

            [name]:
                name === "price" || name === "quantity"
                    ? value === ""
                        ? ""
                        : Number(value)
                    : value,
        }));
    };

    const handleClose = () => {
        setFormData(initialForm);
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Please enter product name.");
            return;
        }

        if (!formData.price || formData.price <= 0) {
            alert("Please enter valid price.");
            return;
        }

        if (!formData.quantity || formData.quantity <= 0) {
            alert("Please enter valid quantity.");
            return;
        }

        onSave({
            name: formData.name.trim(),
            category: formData.category,
            price: Number(formData.price),
            quantity: ["Shopping", "Fuel"].includes(formData.category)
                ? Number(formData.quantity)
                : 1,
            unit: ["Shopping", "Fuel"].includes(formData.category)
                ? formData.unit
                : "item",
        });

        setFormData(initialForm);

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 p-3 backdrop-blur-md sm:p-4">

            <div className="
        flex
        max-h-[92vh]
        w-full
        max-w-3xl
        flex-col
        overflow-hidden
        rounded-[26px]
        border
        border-white/10
        bg-[#0b1120]
        text-white
        shadow-2xl
        shadow-black/50
    ">

                {/* Header */}
                <div className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/[0.08]
            bg-gradient-to-r
            from-violet-600/20
            via-purple-600/10
            to-blue-600/10
            px-4
            py-4
            sm:px-6
            sm:py-5
        ">

                    <div className="min-w-0">

                        <div className="flex items-center gap-2">

                            <div className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-[12px]
                        border
                        border-violet-400/20
                        bg-violet-500/10
                        text-violet-400
                    ">
                                <span className="text-sm">
                                    {editingItem ? "✏️" : "＋"}
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
                                    {editingItem
                                        ? "Edit Expense"
                                        : "Add New Expense"}
                                </h2>

                                <p className="
                            mt-0.5
                            text-[9px]
                            text-slate-500
                            sm:text-xs
                        ">
                                    Keep track of your daily expenses
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Close */}
                    <button
                        onClick={handleClose}
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
                    bg-white/[0.05]
                    text-slate-400
                    transition
                    hover:bg-red-500/10
                    hover:text-red-400
                    active:scale-90
                    sm:h-10
                    sm:w-10
                "
                    >
                        <X size={18} />
                    </button>

                </div>


                {/* Scrollable Form */}
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

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Product Name */}
                        <div>

                            <label className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-400
                    ">
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter expense..."
                                className="
                            h-11
                            w-full
                            rounded-[16px]
                            border
                            border-white/[0.08]
                            bg-white/[0.035]
                            px-4
                            text-xs
                            text-white
                            outline-none
                            transition
                            placeholder:text-slate-600
                            focus:border-violet-400/40
                            focus:bg-violet-500/[0.04]
                            sm:h-12
                            sm:text-sm
                        "
                            />

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
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
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
                            focus:border-violet-400/40
                            sm:h-12
                            sm:text-sm
                        "
                            >
                                <option value="Shopping">🛒 Shopping</option>
                                <option value="Fuel">⛽ Fuel</option>
                                <option value="Recharge">📱 Recharge</option>
                                <option value="Medical">🏥 Medical</option>
                                <option value="Insurance">🛡 Insurance</option>
                                <option value="Electricity">💡 Electricity</option>
                                <option value="Water">🚰 Water</option>
                                <option value="Internet">🌐 Internet</option>
                                <option value="Travel">✈️ Travel</option>
                                <option value="Food">🍔 Food</option>
                                <option value="Education">📚 Education</option>
                                <option value="Other">📦 Other</option>
                            </select>

                        </div>

                    </div>


                    {/* Row 2 */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Price */}
                        <div>

                            <label className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-400
                    ">
                                Price (₹)
                            </label>

                            <div className="relative">

                                <span className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-xs
                            font-bold
                            text-green-400
                        ">
                                    ₹
                                </span>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
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
                                text-white
                                outline-none
                                transition
                                placeholder:text-slate-600
                                focus:border-green-400/30
                                focus:bg-green-400/[0.03]
                                sm:h-12
                                sm:text-sm
                            "
                                />

                            </div>

                        </div>


                        {/* Quantity */}
                        {["Shopping", "Fuel"].includes(formData.category) && (
                            <div>

                                <label className="
                            mb-2
                            block
                            text-xs
                            font-semibold
                            text-slate-400
                        ">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    min="1"
                                    className="
                                h-11
                                w-full
                                rounded-[16px]
                                border
                                border-white/[0.08]
                                bg-white/[0.035]
                                px-4
                                text-xs
                                text-white
                                outline-none
                                transition
                                focus:border-violet-400/40
                                focus:bg-violet-500/[0.04]
                                sm:h-12
                                sm:text-sm
                            "
                                />

                            </div>
                        )}

                    </div>


                    {/* Row 3 */}
                    {["Shopping", "Fuel"].includes(formData.category) && (

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            {/* Unit */}
                            <div>

                                <label className="
                            mb-2
                            block
                            text-xs
                            font-semibold
                            text-slate-400
                        ">
                                    Unit
                                </label>

                                <select
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
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
                                focus:border-violet-400/40
                                sm:h-12
                                sm:text-sm
                            "
                                >
                                    <option value="piece">Piece</option>
                                    <option value="kg">Kg</option>
                                    <option value="gram">Gram</option>
                                    <option value="liter">Liter</option>
                                    <option value="ml">ML</option>
                                    <option value="packet">Packet</option>
                                    <option value="box">Box</option>
                                    <option value="dozen">Dozen</option>
                                    <option value="bottle">Bottle</option>
                                </select>

                            </div>

                        </div>

                    )}


                    {/* Footer */}
                    <div className="
                sticky
                bottom-0
                -mx-4
                mt-2
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
                            onClick={handleClose}
                            className="
                        min-h-[42px]
                        w-full
                        rounded-full
                        border
                        border-white/10
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


                        {/* Submit */}
                        <button
                            type="submit"
                            className="
                        min-h-[42px]
                        w-full
                        rounded-full
                        bg-gradient-to-r
                        from-violet-600
                        to-purple-600
                        px-7
                        text-xs
                        font-bold
                        text-white
                        shadow-lg
                        shadow-violet-500/20
                        transition
                        hover:from-violet-500
                        hover:to-purple-500
                        active:scale-95
                        sm:w-auto
                    "
                        >
                            {editingItem
                                ? "Update Expense"
                                : "Add Expense"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddItem;
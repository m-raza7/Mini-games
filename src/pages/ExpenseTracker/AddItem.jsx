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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
            <div className="w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-start sm:items-center justify-between bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 px-4 sm:px-6 py-4 sm:py-5 text-white">

                    <div>
                        <h2 className="text-lg sm:text-2xl font-bold leading-tight">
                            {editingItem ? "✏️ Edit Expense" : "➕ Add New Expense"}
                        </h2>

                        <p className="mt-1 text-xs sm:text-sm text-violet-100">
                            Keep track of your daily expenses
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Scrollable Form */}
                <form
                    onSubmit={handleSubmit}
                    className="max-h-[calc(92vh-90px)] overflow-y-auto space-y-5 p-4 sm:p-6"
                >

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Expense..."
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-base outline-none transition focus:border-violet-500 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full cursor-pointer rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-base outline-none transition focus:border-violet-500 focus:bg-white"
                            >
                                <option value="Shopping">🛒 Shopping</option>
                                <option value="Fuel">⛽ Fuel</option>
                                <option value="Recharge">📱 Recharge</option>
                                <option value="Medical">🏥 Medical</option>
                                <option value="Insurance">🛡 Insurance</option>
                                <option value="Electricity">💡 Electricity</option>
                                <option value="Water">🚰 Water</option>
                                <option value="Internet">🌐 Internet</option>
                                <option value="Travel">✈ Travel</option>
                                <option value="Food">🍔 Food</option>
                                <option value="Education">📚 Education</option>
                                <option value="Other">📦 Other</option>
                            </select>
                        </div>

                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-semibold text-gray-700">
                                Price (₹)
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter Price"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-base outline-none transition focus:border-violet-500 focus:bg-white"
                            />
                        </div>

                        {["Shopping", "Fuel"].includes(formData.category) && (
                            <div>
                                <label className="mb-2 block font-semibold text-gray-700">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-base outline-none transition focus:border-violet-500 focus:bg-white"
                                />
                            </div>
                        )}

                    </div>

                    {/* Row 3 */}
                    {["Shopping", "Fuel"].includes(formData.category) && (

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block font-semibold text-gray-700">
                                    Unit
                                </label>

                                <select
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3.5 text-base outline-none transition focus:border-violet-500 focus:bg-white"
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
                    <div className="sticky bottom-0 bg-white border-t pt-4 pb-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full sm:w-auto rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                        >
                            {editingItem ? "Update Expense" : "Add Expense"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default AddItem;
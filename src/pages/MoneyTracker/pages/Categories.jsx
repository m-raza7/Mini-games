import { useState } from "react";

import {
    Plus,
    Trash2,
} from "lucide-react";

import {
    expenseCategories,
} from "../data/categories";

import {
    getCustomCategories,
    addCustomCategory,
    deleteCustomCategory,
} from "../utils/storage";

const Categories = () => {
    const [
        customCategories,
        setCustomCategories,
    ] = useState(
        getCustomCategories()
    );

    const [name, setName] =
        useState("");

    const handleAdd = () => {
        const trimmed =
            name.trim();

        if (!trimmed) {
            alert(
                "Please enter category name"
            );

            return;
        }

        const exists = [
            ...expenseCategories,
            ...customCategories,
        ].some(
            (category) =>
                category.name.toLowerCase() ===
                trimmed.toLowerCase()
        );

        if (exists) {
            alert(
                "Category already exists"
            );

            return;
        }

        const newCategory =
            addCustomCategory({
                name: trimmed,
                type: "expense",
            });

        setCustomCategories(
            (previous) => [
                ...previous,
                newCategory,
            ]
        );

        setName("");
    };

    const handleDelete = (id) => {
        const confirmed =
            window.confirm(
                "Delete this category?"
            );

        if (!confirmed) {
            return;
        }

        const updated =
            deleteCustomCategory(id);

        setCustomCategories(updated);
    };

    return (
        <div className="
            mx-auto
            max-w-3xl
            space-y-5
        ">
            <div>
                <h1 className="
                    text-2xl
                    font-bold
                    text-white
                ">
                    Categories
                </h1>

                <p className="
                    mt-1
                    text-sm
                    text-white/40
                ">
                    Manage your expense
                    categories
                </p>
            </div>

            {/* Add category */}

            <div className="
                flex
                gap-2
            ">
                <input
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    onKeyDown={(e) => {
                        if (
                            e.key ===
                            "Enter"
                        ) {
                            handleAdd();
                        }
                    }}
                    placeholder="
                        Add custom category...
                    "
                    className="
                        min-w-0
                        flex-1
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.05]
                        px-4
                        py-3
                        text-white
                        outline-none
                        placeholder:text-white/30
                        focus:border-white/20
                    "
                />

                <button
                    onClick={handleAdd}
                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-2xl
                        bg-violet-500
                        px-4
                        font-semibold
                        text-white
                        transition
                        hover:bg-violet-400
                    "
                >
                    <Plus size={18} />

                    <span className="
                        hidden
                        sm:inline
                    ">
                        Add
                    </span>
                </button>
            </div>

            {/* Default categories */}

            <div className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.05]
                p-5
            ">
                <h2 className="
                    font-semibold
                    text-white
                ">
                    Default Categories
                </h2>

                <div className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-2
                    sm:grid-cols-3
                ">
                    {expenseCategories.map(
                        (category) => {
                            const Icon =
                                category.icon;

                            return (
                                <div
                                    key={
                                        category.id
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        bg-white/[0.04]
                                        p-3
                                    "
                                >
                                    <Icon
                                        size={18}
                                        className="
                                            text-white/50
                                        "
                                    />

                                    <span className="
                                        text-sm
                                        text-white/70
                                    ">
                                        {
                                            category.name
                                        }
                                    </span>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>

            {/* Custom categories */}

            <div className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.05]
                p-5
            ">
                <h2 className="
                    font-semibold
                    text-white
                ">
                    My Categories
                </h2>

                {customCategories.length ===
                    0 ? (
                    <p className="
                        mt-4
                        text-sm
                        text-white/40
                    ">
                        You haven't added
                        any custom categories.
                    </p>
                ) : (
                    <div className="
                        mt-4
                        space-y-2
                    ">
                        {customCategories.map(
                            (category) => (
                                <div
                                    key={
                                        category.id
                                    }
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        bg-white/[0.04]
                                        p-3
                                    "
                                >
                                    <span className="
                                        text-sm
                                        text-white
                                    ">
                                        {
                                            category.name
                                        }
                                    </span>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                category.id
                                            )
                                        }
                                        className="
                                            rounded-xl
                                            p-2
                                            text-white/30
                                            hover:bg-red-500/10
                                            hover:text-red-400
                                        "
                                    >
                                        <Trash2
                                            size={
                                                17
                                            }
                                        />
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
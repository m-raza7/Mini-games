import { useEffect, useState } from "react";

export default function TodoApp() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");

        try {
            return savedTodos ? JSON.parse(savedTodos) : [];
        } catch {
            return [];
        }
    });

    const [input, setInput] = useState("");
    const [editId, setEditId] = useState(null);

    // Save to Local Storage whenever todos change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (!input.trim()) return;

        if (editId) {
            setTodos(
                todos.map((todo) =>
                    todo.id === editId
                        ? {
                            ...todo,
                            text: input.trim(),
                        }
                        : todo
                )
            );

            setEditId(null);
        } else {
            const newTodo = {
                id: Date.now(),
                text: input.trim(),
                completed: false,
                createdAt: new Date().toISOString(),
            };

            setTodos((prev) => [...prev, newTodo]);
        }

        setInput("");
    };

    const editTodo = (todo) => {
        setInput(todo.text);
        setEditId(todo.id);
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));

        if (editId === id) {
            setEditId(null);
            setInput("");
        }
    };

    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed,
                    }
                    : todo
            )
        );
    };

    const clearCompleted = () => {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
    };

    const clearAll = () => {
        if (window.confirm("Delete all todos?")) {
            setTodos([]);
            localStorage.removeItem("todos");
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#050816] text-white">

            {/* Background Glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[130px]" />
                <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-blue-600/15 blur-[130px]" />
                <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-pink-600/10 blur-[130px]" />
            </div>

            {/* Main */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-3 py-6 sm:px-5 sm:py-8">

                <div className="w-full max-w-[760px] pt-10 lg:pt-20">

                    {/* Header */}
                    <div className="mb-5 text-center">

                        <h1 className="
                    text-2xl
                    font-extrabold
                    tracking-tight
                    sm:text-3xl
                ">
                            Todo Manager
                        </h1>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Organize your tasks and stay productive
                        </p>

                    </div>


                    {/* Main Card */}
                    <div className="
                rounded-[28px]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-4
                shadow-2xl
                shadow-black/30
                backdrop-blur-2xl
                sm:p-5
            ">

                        {/* Add / Update Input */}
                        <div className="mb-5 flex gap-2.5">

                            <div className="relative flex-1">

                                <input
                                    type="text"
                                    value={input}
                                    placeholder="Enter a task..."
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") addTodo();
                                    }}
                                    className="
                                h-11
                                w-full
                                rounded-full
                                border
                                border-white/[0.08]
                                bg-black/20
                                px-4
                                pr-4
                                text-xs
                                text-white
                                outline-none
                                placeholder:text-slate-600
                                transition
                                focus:border-violet-400/40
                                focus:bg-white/[0.04]
                                sm:h-12
                                sm:text-sm
                            "
                                />

                            </div>


                            {/* Add / Update */}
                            <button
                                onClick={addTodo}
                                className={`
                            flex
                            h-11
                            shrink-0
                            items-center
                            justify-center
                            gap-1.5
                            rounded-full
                            px-4
                            text-xs
                            font-bold
                            text-white
                            transition-all
                            active:scale-95
                            sm:h-12
                            sm:px-5
                            sm:text-sm

                            ${editId
                                        ? "border border-yellow-400/20 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                                        : "bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-purple-500"
                                    }
                        `}
                            >
                                <span>
                                    {editId ? "✓" : "+"}
                                </span>

                                {editId ? "Update" : "Add"}
                            </button>

                        </div>


                        {/* Stats */}
                        <div className="mb-5 grid grid-cols-3 gap-2.5 sm:gap-3">

                            {/* Total */}
                            <div className="
                        rounded-[18px]
                        border
                        border-blue-400/10
                        bg-blue-400/[0.05]
                        p-3
                        text-center
                        sm:rounded-[20px]
                        sm:p-4
                    ">

                                <div className="
                            mx-auto
                            mb-1.5
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-[9px]
                            bg-blue-400/10
                        ">
                                    <span className="text-xs">
                                        📋
                                    </span>
                                </div>

                                <p className="text-xl font-extrabold text-blue-400 sm:text-2xl">
                                    {todos.length}
                                </p>

                                <p className="text-[9px] text-slate-500 sm:text-[10px]">
                                    Total
                                </p>

                            </div>


                            {/* Completed */}
                            <div className="
                        rounded-[18px]
                        border
                        border-green-400/10
                        bg-green-400/[0.05]
                        p-3
                        text-center
                        sm:rounded-[20px]
                        sm:p-4
                    ">

                                <div className="
                            mx-auto
                            mb-1.5
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-[9px]
                            bg-green-400/10
                        ">
                                    <span className="text-xs">
                                        ✓
                                    </span>
                                </div>

                                <p className="text-xl font-extrabold text-green-400 sm:text-2xl">
                                    {todos.filter((t) => t.completed).length}
                                </p>

                                <p className="text-[9px] text-slate-500 sm:text-[10px]">
                                    Completed
                                </p>

                            </div>


                            {/* Pending */}
                            <div className="
                        rounded-[18px]
                        border
                        border-orange-400/10
                        bg-orange-400/[0.05]
                        p-3
                        text-center
                        sm:rounded-[20px]
                        sm:p-4
                    ">

                                <div className="
                            mx-auto
                            mb-1.5
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-[9px]
                            bg-orange-400/10
                        ">
                                    <span className="text-xs">
                                        ⏳
                                    </span>
                                </div>

                                <p className="text-xl font-extrabold text-orange-400 sm:text-2xl">
                                    {todos.filter((t) => !t.completed).length}
                                </p>

                                <p className="text-[9px] text-slate-500 sm:text-[10px]">
                                    Pending
                                </p>

                            </div>

                        </div>


                        {/* Action Buttons */}
                        <div className="mb-5 flex items-center justify-between">

                            <p className="text-xs font-bold text-white">
                                My Tasks
                            </p>

                            <div className="flex gap-2">

                                <button
                                    onClick={clearCompleted}
                                    className="
                                rounded-full
                                border
                                border-orange-400/20
                                bg-orange-400/[0.06]
                                px-3
                                py-2
                                text-[9px]
                                font-semibold
                                text-orange-400
                                transition
                                hover:bg-orange-400/15
                                active:scale-95
                                sm:px-4
                                sm:text-[10px]
                            "
                                >
                                    Clear Done
                                </button>

                                <button
                                    onClick={clearAll}
                                    className="
                                rounded-full
                                border
                                border-red-400/20
                                bg-red-400/[0.06]
                                px-3
                                py-2
                                text-[9px]
                                font-semibold
                                text-red-400
                                transition
                                hover:bg-red-400/15
                                active:scale-95
                                sm:px-4
                                sm:text-[10px]
                            "
                                >
                                    Clear All
                                </button>

                            </div>

                        </div>


                        {/* Todo List */}
                        <div className="space-y-2.5">

                            {todos.length === 0 ? (

                                /* Empty State */
                                <div className="
                            rounded-[22px]
                            border
                            border-dashed
                            border-white/[0.08]
                            bg-black/10
                            px-5
                            py-10
                            text-center
                        ">

                                    <div className="
                                mx-auto
                                mb-3
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-[18px]
                                bg-white/[0.04]
                            ">
                                        <span className="text-2xl">
                                            🚀
                                        </span>
                                    </div>

                                    <p className="text-sm font-semibold text-slate-400">
                                        No Todos Found
                                    </p>

                                    <p className="mt-1 text-[10px] text-slate-600">
                                        Add your first task above
                                    </p>

                                </div>

                            ) : (

                                todos.map((todo) => (

                                    <div
                                        key={todo.id}
                                        className={`
                                    group
                                    rounded-[20px]
                                    border
                                    p-3
                                    transition-all
                                    duration-200
                                    sm:p-3.5

                                    ${todo.completed
                                                ? "border-green-400/15 bg-green-400/[0.045]"
                                                : "border-white/[0.07] bg-black/15 hover:border-violet-400/20 hover:bg-white/[0.035]"
                                            }
                                `}
                                    >

                                        <div className="flex items-center gap-3">

                                            {/* Checkbox */}
                                            <button
                                                onClick={() => toggleComplete(todo.id)}
                                                className={`
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-[11px]
                                            border
                                            transition-all
                                            active:scale-90

                                            ${todo.completed
                                                        ? "border-green-400/30 bg-green-400/10 text-green-400"
                                                        : "border-white/10 bg-white/[0.03] text-transparent hover:border-violet-400/30"
                                                    }
                                        `}
                                            >
                                                <span className="text-sm font-bold">
                                                    ✓
                                                </span>
                                            </button>


                                            {/* Todo Content */}
                                            <div className="min-w-0 flex-1">

                                                <p
                                                    className={`
                                                break-words
                                                text-xs
                                                font-semibold
                                                leading-relaxed
                                                sm:text-sm

                                                ${todo.completed
                                                            ? "text-slate-500 line-through"
                                                            : "text-slate-200"
                                                        }
                                            `}
                                                >
                                                    {todo.text}
                                                </p>

                                                <p className="mt-1 text-[8px] text-slate-600 sm:text-[9px]">
                                                    {new Date(todo.createdAt).toLocaleString()}
                                                </p>

                                            </div>


                                            {/* Actions */}
                                            <div className="flex shrink-0 gap-1.5">

                                                {/* Edit */}
                                                <button
                                                    onClick={() => editTodo(todo)}
                                                    className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-[10px]
                                                border
                                                border-yellow-400/15
                                                bg-yellow-400/[0.06]
                                                text-yellow-400
                                                transition
                                                hover:bg-yellow-400/15
                                                active:scale-90
                                            "
                                                    title="Edit"
                                                >
                                                    <span className="text-xs">
                                                        ✎
                                                    </span>
                                                </button>


                                                {/* Delete */}
                                                <button
                                                    onClick={() => deleteTodo(todo.id)}
                                                    className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                rounded-[10px]
                                                border
                                                border-red-400/15
                                                bg-red-400/[0.06]
                                                text-red-400
                                                transition
                                                hover:bg-red-400/15
                                                active:scale-90
                                            "
                                                    title="Delete"
                                                >
                                                    <span className="text-xs">
                                                        🗑
                                                    </span>
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            )}

                        </div>

                    </div>


                    {/* Footer */}
                    <div className="mt-4 text-center">

                        <p className="text-[9px] text-slate-600 sm:text-[10px]">
                            Stay organized • One task at a time
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}
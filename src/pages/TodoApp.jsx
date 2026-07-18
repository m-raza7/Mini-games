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
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-3 sm:p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-8">

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
                    ✨ Todo CRUD App
                </h1>

                {/* Input */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <input
                        type="text"
                        value={input}
                        placeholder="Enter task..."
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addTodo();
                        }}
                        className="w-full flex-1 border-2 border-purple-300 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                    />

                    <button
                        onClick={addTodo}
                        className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white font-semibold transition ${editId
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-purple-600 hover:bg-purple-700"
                            }`}
                    >
                        {editId ? "Update" : "Add"}
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-100 rounded-xl p-4 text-center font-medium">
                        Total: {todos.length}
                    </div>

                    <div className="bg-green-100 rounded-xl p-4 text-center font-medium">
                        Completed: {todos.filter((t) => t.completed).length}
                    </div>

                    <div className="bg-red-100 rounded-xl p-4 text-center font-medium">
                        Pending: {todos.filter((t) => !t.completed).length}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                        onClick={clearCompleted}
                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg transition"
                    >
                        Clear Completed
                    </button>

                    <button
                        onClick={clearAll}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition"
                    >
                        Clear All
                    </button>
                </div>

                {/* Todo List */}
                <div className="space-y-4">

                    {todos.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-lg sm:text-xl">
                            No Todos Found 🚀
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`p-4 rounded-2xl shadow-md border-l-4 ${todo.completed
                                        ? "bg-green-100 border-green-500"
                                        : "bg-gray-50 border-purple-500"
                                    }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                                    {/* Left */}
                                    <div className="flex items-start gap-3 flex-1 min-w-0">

                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => toggleComplete(todo.id)}
                                            className="w-5 h-5 mt-1 shrink-0"
                                        />

                                        <div className="min-w-0">

                                            <p
                                                className={`font-medium break-words ${todo.completed
                                                        ? "line-through text-gray-500"
                                                        : ""
                                                    }`}
                                            >
                                                {todo.text}
                                            </p>

                                            <p className="text-xs text-gray-500 break-all">
                                                {new Date(todo.createdAt).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Right */}
                                    <div className="flex gap-2 w-full sm:w-auto">

                                        <button
                                            onClick={() => editTodo(todo)}
                                            className="flex-1 sm:flex-none bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))
                    )}

                </div>

            </div>
        </div>
    );
}
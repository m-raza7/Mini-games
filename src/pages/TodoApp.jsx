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
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
                <h1 className="text-4xl font-bold text-center mb-8">
                    ✨ Todo CRUD App
                </h1>

                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        value={input}
                        placeholder="Enter task..."
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addTodo();
                        }}
                        className="flex-1 border-2 border-purple-300 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                    />

                    <button
                        onClick={addTodo}
                        className={`px-6 py-3 rounded-xl text-white font-semibold ${editId
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-purple-600 hover:bg-purple-700"
                            }`}
                    >
                        {editId ? "Update" : "Add"}
                    </button>
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="bg-blue-100 px-5 py-3 rounded-xl">
                        Total: {todos.length}
                    </div>

                    <div className="bg-green-100 px-5 py-3 rounded-xl">
                        Completed: {todos.filter((t) => t.completed).length}
                    </div>

                    <div className="bg-red-100 px-5 py-3 rounded-xl">
                        Pending: {todos.filter((t) => !t.completed).length}
                    </div>
                </div>

                <div className="flex gap-3 mb-6">
                    <button
                        onClick={clearCompleted}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                    >
                        Clear Completed
                    </button>

                    <button
                        onClick={clearAll}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Clear All
                    </button>
                </div>

                <div className="space-y-4">
                    {todos.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-xl">
                            No Todos Found 🚀
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`flex items-center justify-between p-4 rounded-2xl shadow-md ${todo.completed
                                    ? "bg-green-100 border-l-4 border-green-500"
                                    : "bg-gray-50 border-l-4 border-purple-500"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo.id)}
                                        className="w-5 h-5"
                                    />

                                    <div>
                                        <p
                                            className={`font-medium ${todo.completed
                                                ? "line-through text-gray-500"
                                                : ""
                                                }`}
                                        >
                                            {todo.text}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {new Date(todo.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => editTodo(todo)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
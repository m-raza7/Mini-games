import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Todo", path: "/todos" },
    { name: "Flip Coin", path: "/flip-coin" },
    { name: "Q & A Game", path: "/right-wrong" },
    { name: "Grid Game", path: "/right-wrong-grid" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-gradient-to-r from-[#140b38]/95 via-[#2b135c]/95 to-[#41136d]/95">
            <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="text-2xl font-extrabold text-white tracking-wide"
                >
                    Mini<span className="text-violet-400">Games</span>
                </NavLink>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-full transition-all duration-300 font-medium ${isActive
                                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                                    : "text-gray-300 hover:text-white hover:bg-white/10"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="px-5 pb-5 bg-[#1d1046] border-t border-white/10">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `block rounded-xl px-4 py-3 mt-2 transition ${isActive
                                    ? "bg-violet-600 text-white"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
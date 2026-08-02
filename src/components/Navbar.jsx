import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Todo", path: "/todos" },
    { name: "Flip Coin", path: "/flip-coin" },
    { name: "Q & A Game", path: "/right-wrong" },
    { name: "Grid Game", path: "/right-wrong-grid" },
    { name: "Expense Tracker", path: "/expense-tracker" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 md:top-4 left-0 right-0 z-50 px-4 md:px-4">
            <div className="max-w-7xl mx-auto">

                {/* <div
                    className="
    flex items-center justify-between h-16 px-2

    px-6
    rounded-3xl
    border border-white/10
    bg-black/20
    backdrop-blur-2xl
    shadow-2xl
    shadow-violet-900/20
  "
                > */}
                <div
                    className="
    flex items-center justify-between h-16 px-2

    md:px-6
    md:rounded-3xl
    md:border md:border-white/15
    md:bg-black/30
    md:backdrop-blur-2xl
    md:shadow-2xl
    md:shadow-violet-900/20
  "
                >
                    {/* Logo */}
                    {/* <NavLink
                        to="/"
                        className="flex items-center gap-3"
                    > */}
                    {/* <h1 className="text-3xl font-black tracking-tight text-white">
                            Mini<span className="text-violet-400">Verse</span>
                        </h1> */}
                    {/* <img src={logo} alt="Logo" />
                    </NavLink> */}
                    <NavLink
                        to="/"
                        className="flex items-center"
                    >
                        <img
                            src={logo}
                            alt="MiniVerse Logo"
                            className="h-17 w-auto sm:h-12 md:h-14 lg:h-16 object-contain"
                        />
                    </NavLink>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-2">

                        {navLinks.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl shadow-violet-600/40"
                                        : "text-gray-300 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">

                        <button
                            className="
    hidden md:flex
    h-11 w-11
    items-center justify-center
    rounded-full
    border border-white/15
    bg-white/10
    backdrop-blur-xl
    text-white
    hover:bg-white/20
    transition-all
  "
                        >
                            👤
                        </button>

                        {/* Mobile Menu */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-white shadow-lg transition hover:bg-black/55"
                        >
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>

                    </div>

                </div>

                {/* Mobile Menu */}

                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 mt-3" : "max-h-0"
                        }`}
                >

                    <div className="rounded-3xl border border-white/15 bg-black/40 backdrop-blur-2xl p-4 shadow-xl">

                        {navLinks.map((item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `block rounded-2xl px-4 py-3 mt-2 text-sm font-medium transition ${isActive
                                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>

                        ))}

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Navbar;
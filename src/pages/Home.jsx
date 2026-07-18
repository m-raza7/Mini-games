import React from "react";
import { Link } from "react-router-dom";
import {
    CheckSquare,
    Coins,
    Trophy,
    Grid3X3,
    ArrowRight,
} from "lucide-react";
// import Footer from "../components/Footer";

const games = [
    {
        title: "Todo App",
        description: "Manage your daily tasks with full CRUD functionality.",
        path: "/todos",
        icon: CheckSquare,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Flip Coin",
        description: "Test your luck with an animated coin flip game.",
        path: "/flip-coin",
        icon: Coins,
        color: "from-yellow-500 to-orange-500",
    },
    {
        title: "Q & A Game",
        description: "Challenge yourself with right and wrong decisions.",
        path: "/right-wrong",
        icon: Trophy,
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Right Wrong Game",
        description: "Play the strategic grid game and find the winner.",
        path: "/right-wrong-grid",
        icon: Grid3X3,
        color: "from-purple-500 to-pink-500",
    },
];

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-pink-600/20 blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10">

                {/* Hero Section */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-sm text-white/70">
                            Created by <span className="font-semibold text-white">Mr Raza</span>
                        </span>
                    </div>

                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
                        <span className="text-sm text-white/70">
                            🚀 React Mini Games Collection
                        </span>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {games.map((game) => {
                        const Icon = game.icon;

                        return (
                            <Link
                                key={game.path}
                                to={game.path}
                                className="group"
                            >
                                <div className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20">

                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${game.color} flex items-center justify-center shadow-lg`}
                                    >
                                        <Icon size={30} className="text-white" />
                                    </div>

                                    <h2 className="mt-6 text-2xl font-bold text-white">
                                        {game.title}
                                    </h2>

                                    <p className="mt-3 text-sm text-white/60 leading-relaxed">
                                        {game.description}
                                    </p>

                                    <div className="mt-6 flex items-center text-white font-semibold">
                                        Play Now
                                        <ArrowRight
                                            size={18}
                                            className="ml-2 transition-transform group-hover:translate-x-2"
                                        />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default Home;
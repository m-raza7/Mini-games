import React from "react";
import { Link } from "react-router-dom";
import {
    CheckSquare,
    Coins,
    Trophy,
    Grid3X3,
    ArrowRight,
    IndianRupee,
    Rocket,
    Shield,
    Wifi,
    Zap,
} from "lucide-react";

import bgdesktop from "../assets/bg-desktop.png";
import mobileBg from "../assets/bg-mobile.png";
// import phoneMockup from "../assets/mobile-preview.png";
import Footer from "../components/Footer";

const games = [
    {
        title: "Todo App",
        description: "Manage your daily tasks with ease.",
        path: "/todos",
        icon: CheckSquare,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Expense Tracker",
        description: "Track spending & manage budget.",
        path: "/expense-tracker",
        icon: IndianRupee,
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Flip Coin",
        description: "Test your luck instantly.",
        path: "/flip-coin",
        icon: Coins,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Q & A Game",
        description: "Challenge your mind.",
        path: "/right-wrong",
        icon: Trophy,
        color: "from-orange-500 to-yellow-500",
    },
    {
        title: "Right Wrong",
        description: "Strategic grid game.",
        path: "/right-wrong-grid",
        icon: Grid3X3,
        color: "from-pink-500 to-purple-500",
    },
];

const features = [
    {
        title: "5+ Apps",
        icon: Rocket,
    },
    {
        title: "Fast",
        icon: Zap,
    },
    {
        title: "Offline Ready",
        icon: Wifi,
    },
    {
        title: "Secure",
        icon: Shield,
    },
];

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* Background */}
            <div
                className="absolute inset-0 hidden md:block bg-cover bg-center"
                style={{ backgroundImage: `url(${bgdesktop})` }}
            />

            <div
                className="absolute inset-0 md:hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${mobileBg})` }}
            />

            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-5 py-12">

                {/* Hero */}

                <div className="text-center">

                    <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-white">

                        <span className="text-white">
                            Mini
                        </span>

                        <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent">
                            Verse
                        </span>

                    </h1>

                    <p className="mt-5 text-2xl font-semibold text-white">
                        Play • Track • Learn • Win
                    </p>

                    <p className="mt-3 text-white/70 text-lg">
                        A World of Mini Apps in One Place
                    </p>

                </div>

                {/* Feature Badges */}

                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    {features.map((item) => {

                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-xl"
                            >
                                <Icon size={18} className="text-violet-300" />
                                <span className="text-white">
                                    {item.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Content */}

                <div className="mt-16 flex flex-col lg:flex-row gap-10">

                    {/* Cards */}

                    <div className="flex-1">

                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

                            {games.map((game) => {

                                const Icon = game.icon;

                                return (
                                    <Link
                                        key={game.path}
                                        to={game.path}
                                        className="group"
                                    >

                                        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/15">

                                            <div
                                                className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${game.color} flex items-center justify-center`}
                                            >
                                                <Icon className="text-white" size={30} />
                                            </div>

                                            <h2 className="mt-6 text-2xl font-bold text-white">
                                                {game.title}
                                            </h2>

                                            <p className="mt-3 text-white/70">
                                                {game.description}
                                            </p>

                                            <button className="mt-6 flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-white transition hover:bg-violet-500">

                                                Play Now

                                                <ArrowRight
                                                    size={18}
                                                    className="group-hover:translate-x-1 transition"
                                                />

                                            </button>

                                        </div>

                                    </Link>
                                );
                            })}
                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </div>
    );
}
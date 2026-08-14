import { Link } from "react-router-dom";

import {
    Shield,
    FileText,
    Mail,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative px-3 pb-4 pt-8 sm:px-5 sm:pt-10">
            <div className="mx-auto max-w-7xl">

                {/* =====================================================
                    FOOTER CARD
                ====================================================== */}

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-white/[0.08]
                        bg-[#0b0f1c]/80
                        shadow-2xl
                        shadow-black/30
                        backdrop-blur-2xl
                    "
                >

                    {/* Background Glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-32
                            -top-32
                            h-72
                            w-72
                            rounded-full
                            bg-violet-600/[0.08]
                            blur-[100px]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-40
                            left-1/4
                            h-72
                            w-72
                            rounded-full
                            bg-fuchsia-600/[0.05]
                            blur-[100px]
                        "
                    />

                    {/* =================================================
                        MAIN FOOTER
                    ================================================== */}

                    <div
                        className="
                            relative
                            grid
                            gap-8
                            px-5
                            py-7

                            sm:px-7
                            sm:py-8

                            lg:grid-cols-[1.5fr_1fr_1fr]
                            lg:gap-10
                            lg:px-10
                            lg:py-9
                        "
                    >

                        {/* =================================================
                            BRAND
                        ================================================== */}

                        <div>

                            <div className="flex items-center gap-3">

                                {/* Logo */}

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-violet-400/20
                                        bg-slate-950/80
                                        shadow-lg
                                        shadow-violet-500/10
                                    "
                                >
                                    <img
                                        src="/logo.png"
                                        alt="MiniVerse"
                                        className="
                                            h-full
                                            w-full
                                            object-contain
                                            p-1.5
                                        "
                                    />
                                </div>

                                {/* Brand */}

                                <div>

                                    <h2 className="text-2xl font-black tracking-tight text-white">
                                        Mini
                                        <span
                                            className="
                                                bg-gradient-to-r
                                                from-violet-400
                                                via-fuchsia-400
                                                to-pink-400
                                                bg-clip-text
                                                text-transparent
                                            "
                                        >
                                            Verse
                                        </span>
                                    </h2>

                                    <div className="mt-0.5 flex items-center gap-1.5">
                                        <Sparkles
                                            size={11}
                                            className="text-violet-400"
                                        />

                                        <span className="text-[11px] font-medium text-slate-500">
                                            Mini apps. One universe.
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* Description */}

                            <p
                                className="
                                    mt-5
                                    max-w-md
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Simple tools and mini apps for everyday
                                life — from productivity and money management
                                to quick games and fun.
                            </p>

                            {/* Social */}

                            <div className="mt-5 flex items-center gap-2.5">

                                <a
                                    href="#"
                                    aria-label="FaGithub "
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.03]
                                        text-slate-500
                                        transition-all
                                        duration-200
                                        hover:border-white/15
                                        hover:bg-white/[0.07]
                                        hover:text-white
                                        active:scale-95
                                    "
                                >
                                    <FaGithub size={17} />
                                </a>

                                <a
                                    href="#"
                                    aria-label=" FaLinkedin"
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.03]
                                        text-slate-500
                                        transition-all
                                        duration-200
                                        hover:border-blue-400/20
                                        hover:bg-blue-400/10
                                        hover:text-blue-400
                                        active:scale-95
                                    "
                                >
                                    < FaLinkedin size={17} />
                                </a>

                                <a
                                    href="#"
                                    aria-label="FaInstagram"
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.03]
                                        text-slate-500
                                        transition-all
                                        duration-200
                                        hover:border-pink-400/20
                                        hover:bg-pink-400/10
                                        hover:text-pink-400
                                        active:scale-95
                                    "
                                >
                                    <FaInstagram size={17} />
                                </a>

                                <a
                                    href="#"
                                    aria-label="FaYoutube"
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/[0.07]
                                        bg-white/[0.03]
                                        text-slate-500
                                        transition-all
                                        duration-200
                                        hover:border-red-400/20
                                        hover:bg-red-400/10
                                        hover:text-red-400
                                        active:scale-95
                                    "
                                >
                                    <FaYoutube size={17} />
                                </a>

                            </div>

                        </div>


                        {/* =================================================
                            QUICK LINKS
                        ================================================== */}

                        <div>

                            <h3
                                className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-slate-400
                                "
                            >
                                Quick Links
                            </h3>

                            <div className="mt-4 space-y-2.5">

                                <Link
                                    to="/"
                                    className="
                                        group
                                        flex
                                        w-fit
                                        items-center
                                        gap-1.5
                                        text-sm
                                        text-slate-500
                                        transition-colors
                                        hover:text-white
                                    "
                                >
                                    Home

                                    <ArrowUpRight
                                        size={13}
                                        className="
                                            opacity-0
                                            transition-all
                                            group-hover:translate-x-0.5
                                            group-hover:-translate-y-0.5
                                            group-hover:opacity-100
                                        "
                                    />
                                </Link>

                                <Link
                                    to="/todos"
                                    className="
                                        group
                                        flex
                                        w-fit
                                        items-center
                                        gap-1.5
                                        text-sm
                                        text-slate-500
                                        transition-colors
                                        hover:text-white
                                    "
                                >
                                    Todo App

                                    <ArrowUpRight
                                        size={13}
                                        className="
                                            opacity-0
                                            transition-all
                                            group-hover:translate-x-0.5
                                            group-hover:-translate-y-0.5
                                            group-hover:opacity-100
                                        "
                                    />
                                </Link>

                                <Link
                                    to="/expense-tracker"
                                    className="
                                        group
                                        flex
                                        w-fit
                                        items-center
                                        gap-1.5
                                        text-sm
                                        text-slate-500
                                        transition-colors
                                        hover:text-white
                                    "
                                >
                                    Expense Tracker

                                    <ArrowUpRight
                                        size={13}
                                        className="
                                            opacity-0
                                            transition-all
                                            group-hover:translate-x-0.5
                                            group-hover:-translate-y-0.5
                                            group-hover:opacity-100
                                        "
                                    />
                                </Link>

                                <Link
                                    to="/flip-coin"
                                    className="
                                        group
                                        flex
                                        w-fit
                                        items-center
                                        gap-1.5
                                        text-sm
                                        text-slate-500
                                        transition-colors
                                        hover:text-white
                                    "
                                >
                                    Flip Coin

                                    <ArrowUpRight
                                        size={13}
                                        className="
                                            opacity-0
                                            transition-all
                                            group-hover:translate-x-0.5
                                            group-hover:-translate-y-0.5
                                            group-hover:opacity-100
                                        "
                                    />
                                </Link>

                            </div>

                        </div>


                        {/* =================================================
                            SUPPORT / LEGAL
                        ================================================== */}

                        <div>

                            <h3
                                className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-slate-400
                                "
                            >
                                Support
                            </h3>

                            <div className="mt-4 space-y-2.5">

                                <Link
                                    to="/policy"
                                    className="
                                        flex
                                        w-fit
                                        items-center
                                        gap-2
                                        text-sm
                                        text-slate-500
                                        transition-colors
                                        hover:text-violet-400
                                    "
                                >
                                    <Shield size={15} />
                                    Privacy Policy
                                </Link>

                                <Link
                                    to="/terms-conditions"
                                    className="
                                        flex
                                        w-fit
                                        items-center
                                        gap-2
                                        text-sm
                                        text-slate-500
                                        transition-colors
                                        hover:text-violet-400
                                    "
                                >
                                    <FileText size={15} />
                                    Terms & Conditions
                                </Link>

                                <a
                                    href="https://portfolio-frontend-sand-delta.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        flex
                                        w-fit
                                        items-center
                                        gap-2
                                        text-sm
                                        text-slate-500
                                        transition-colors
                                        hover:text-violet-400
                                    "
                                >
                                    <Mail size={15} />
                                    Contact
                                </a>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        BOTTOM BAR
                    ================================================== */}

                    <div
                        className="
                            relative
                            mx-5
                            border-t
                            border-white/[0.06]
                            py-4

                            sm:mx-7

                            lg:mx-10
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                items-center
                                justify-between
                                gap-2
                                text-center

                                sm:flex-row
                                sm:text-left
                            "
                        >

                            <p className="text-[11px] text-slate-600">
                                © {currentYear}{" "}
                                <span className="font-semibold text-slate-400">
                                    MiniVerse
                                </span>
                                . All rights reserved.
                            </p>

                            <p className="text-[11px] text-slate-600">
                                Built for everyday moments.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
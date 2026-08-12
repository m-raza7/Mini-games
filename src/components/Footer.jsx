import { Link } from "react-router-dom";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

import {
    Shield,
    Star,
    Mail,
    FileText,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative px-4 pb-6">

            <div className="max-w-7xl mx-auto">

                <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-2xl shadow-2xl shadow-violet-900/30">

                    {/* Desktop */}

                    <div className="hidden md:flex items-center justify-between px-8 py-6">

                        {/* Logo */}

                        <div className="flex items-center gap-3">

                            <div className="
    flex
    items-center
    justify-center
    shrink-0
    overflow-hidden
    rounded-2xl
    border
    border-violet-400/20
    bg-slate-950/80
    shadow-lg
    shadow-violet-500/10
    backdrop-blur-xl

    h-12
    w-12

    sm:h-13
    sm:w-13

    md:h-14
    md:w-14

    lg:h-15
    lg:w-15

    xl:h-16
    xl:w-16
">
                                <img
                                    src="/logo.png"
                                    alt="MiniVerse"
                                    className="
            h-full
            w-full
            object-contain
            p-1
            sm:p-1.5
            md:p-1.5
        "
                                />
                            </div>

                            <div>


                                <h2 className="text-3xl font-black text-white">
                                    Mini
                                    <span className="text-violet-400">
                                        Verse
                                    </span>
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    Explore • Play • Enjoy
                                </p>

                            </div>

                        </div>

                        {/* Links */}

                        <div className="flex items-center gap-8 text-gray-300">

                            <Link
                                to="/policy"
                                className="hover:text-violet-400 transition flex items-center gap-2"
                            >
                                <Shield size={18} />
                                Privacy
                            </Link>

                            <Link
                                to="/terms-conditions"
                                className="hover:text-violet-400 transition flex items-center gap-2"
                            >
                                <FileText size={18} />
                                Terms
                            </Link>

                            <a
                                href="https://portfolio-frontend-sand-delta.vercel.app/"
                                className="hover:text-violet-400 transition flex items-center gap-2"
                            >
                                <Mail size={18} />
                                Contact
                            </a>

                            <a
                                href="#"
                                className="hover:text-yellow-400 transition flex items-center gap-2"
                            >
                                <Star size={18} />
                                Rate App
                            </a>

                        </div>

                        {/* Social */}

                        <div className="flex gap-4">

                            <a
                                href="#"
                                className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-600 transition"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="#"
                                className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="#"
                                className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 transition"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 transition"
                            >
                                <FaYoutube />
                            </a>

                        </div>

                    </div>

                    {/* Mobile */}

                    <div className="md:hidden px-6 py-8 text-center">

                        <div className="flex justify-center mb-3">

                            <div className="
    flex
    items-center
    justify-center
    shrink-0
    overflow-hidden
    rounded-2xl
    border
    border-violet-400/20
    bg-slate-950/80
    shadow-lg
    shadow-violet-500/10
    backdrop-blur-xl

    h-12
    w-12

    sm:h-13
    sm:w-13

    md:h-14
    md:w-14

    lg:h-15
    lg:w-15

    xl:h-16
    xl:w-16
">
                                <img
                                    src="/logo.png"
                                    alt="MiniVerse"
                                    className="
            h-full
            w-full
            object-contain
            p-1
            sm:p-1.5
            md:p-1.5
        "
                                />
                            </div>

                        </div>

                        <h2 className="text-3xl font-black text-white">
                            Mini
                            <span className="text-violet-400">
                                Verse
                            </span>
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Explore • Play • Enjoy
                        </p>

                        {/* Links */}

                        <div className="flex flex-wrap justify-center gap-3 mt-6">

                            <Link
                                to="/policy"
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                            >
                                Privacy
                            </Link>

                            <Link
                                to="/terms-conditions"
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                            >
                                Terms
                            </Link>

                            {/* <a
                                href="https://portfolio-frontend-sand-delta.vercel.app/"
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300"
                            >
                                Contact
                            </a> */}
                            <a href="https://portfolio-frontend-sand-delta.vercel.app/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                                Contact
                            </a>

                        </div>

                        {/* Social */}

                        <div className="flex justify-center gap-5 mt-8 text-white">

                            <FaGithub size={24} />

                            <FaLinkedin size={24} />

                            <FaInstagram size={24} />

                            <FaYoutube size={24} />

                        </div>

                        <div className="border-t border-white/10 mt-8 pt-5">

                            <p className="text-sm text-gray-400 text-center md:text-left">
                                © {new Date().getFullYear()}{" "}
                                <span className="font-semibold text-white">
                                    MiniVerse
                                </span>
                                . All Rights Reserved.
                            </p>

                            {/* <p className="text-xs text-gray-500 mt-2">
                                Built with ❤️ using React & Tailwind CSS
                            </p> */}

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
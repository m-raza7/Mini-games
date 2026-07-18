import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-gradient-to-r from-[#140b38]/95 via-[#2b135c]/95 to-[#41136d]/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">

                {/* Left */}
                <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-extrabold text-white tracking-wide">
                        Mini<span className="text-violet-400">Games</span>
                    </h3>

                    <p className="mt-2 text-sm text-gray-300">
                        A collection of interactive React mini games built with
                        modern web technologies.
                    </p>
                </div>

                {/* Center */}
                <div className="text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-semibold text-white">
                            Mr Raza
                        </span>
                        . All Rights Reserved.
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Built with ❤️ using React & Tailwind CSS
                    </p>
                </div>

                {/* Right */}
                <div className="flex flex-wrap justify-center gap-3">

                    <Link
                        to="/privacy"
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur transition-all duration-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        to="/terms-conditions"
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur transition-all duration-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
                    >
                        Terms & Conditions
                    </Link>

                    <a
                        href="https://portfolio-frontend-sand-delta.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur transition-all duration-300 hover:bg-violet-600 hover:text-white hover:border-violet-500"
                    >
                        Contact
                    </a>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
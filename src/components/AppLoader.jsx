import React from "react";
import logo from "../assets/logo.png";
import desktopBg from "../assets/bg-desktop.png";
import mobileBg from "../assets/bg-mobile.png";

const AppLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden">

            {/* Desktop Background */}
            <img
                src={desktopBg}
                alt=""
                className="hidden md:block absolute inset-0 h-full w-full object-cover"
            />

            {/* Mobile Background */}
            <img
                src={mobileBg}
                alt=""
                className="md:hidden absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-[#140b38]/60 to-black/80 backdrop-blur-[2px]" />

            {/* Purple Glow */}

            <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/30 blur-[120px]" />

            {/* Content */}

            <div className="relative flex h-full flex-col items-center justify-center px-6">

                {/* Logo */}

                <div className="animate-[pulse_2s_infinite]">

                    <img
                        src={logo}
                        alt="MiniVerse"
                        className="w-52 sm:w-64 md:w-80 object-contain drop-shadow-[0_0_40px_rgba(168,85,247,.6)]"
                    />

                </div>

                {/* Loading Text */}

                <h2 className="mt-10 text-2xl md:text-3xl font-bold text-white tracking-wide">

                    Loading MiniVerse

                    <span className="inline-flex">

                        <span className="animate-bounce">.</span>

                        <span className="animate-bounce delay-150">.</span>

                        <span className="animate-bounce delay-300">.</span>

                    </span>

                </h2>

                <p className="mt-3 text-white/70 text-center text-sm md:text-base">

                    Preparing your mini apps experience

                </p>

                {/* Spinner */}

                <div className="relative mt-10">

                    <div className="h-16 w-16 rounded-full border-[5px] border-white/20" />

                    <div className="absolute inset-0 h-16 w-16 rounded-full border-[5px] border-transparent border-t-violet-400 border-r-pink-500 animate-spin" />

                </div>

                {/* Progress Bar */}

                <div className="mt-12 w-72 sm:w-96">

                    <div className="h-2 overflow-hidden rounded-full bg-white/15">

                        <div className="h-full w-full animate-[loading_2.5s_linear_infinite] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AppLoader;
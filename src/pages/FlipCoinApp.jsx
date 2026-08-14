import { useState } from "react";

import Head from "../assets/Head-coin.png";
import Tail from "../assets/Tail-coin.png";

export default function FlipCoinApp() {
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState("Heads");

    const [totalFlips, setTotalFlips] = useState(0);
    const [headsCount, setHeadsCount] = useState(0);
    const [tailsCount, setTailsCount] = useState(0);

    const flipCoin = () => {
        if (isFlipping) return;

        setIsFlipping(true);

        setTimeout(() => {
            const randomResult =
                Math.random() < 0.5 ? "Heads" : "Tails";

            setResult(randomResult);
            setTotalFlips((prev) => prev + 1);

            if (randomResult === "Heads") {
                setHeadsCount((prev) => prev + 1);
            } else {
                setTailsCount((prev) => prev + 1);
            }

            setIsFlipping(false);
        }, 1500);
    };

    const resetStats = () => {
        setTotalFlips(0);
        setHeadsCount(0);
        setTailsCount(0);
        setResult("Heads");
    };

    const headsPercentage =
        totalFlips > 0
            ? (headsCount / totalFlips) * 100
            : 0;

    const tailsPercentage =
        totalFlips > 0
            ? (tailsCount / totalFlips) * 100
            : 0;

    const coinImage =
        result === "Heads" ? Head : Tail;

    return (
        <div
            className="
                relative
                min-h-screen
                w-full
                overflow-hidden
                bg-[#050816]
                text-white
            "
        >
            {/* =====================================================
                BACKGROUND GLOW
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    overflow-hidden
                "
            >
                <div
                    className="
                        absolute
                        -left-32
                        -top-32
                        h-72
                        w-72
                        rounded-full
                        bg-violet-600/20
                        blur-[100px]
                    "
                />

                <div
                    className="
                        absolute
                        -right-32
                        top-1/3
                        h-80
                        w-80
                        rounded-full
                        bg-blue-600/15
                        blur-[120px]
                    "
                />

                <div
                    className="
                        absolute
                        -bottom-32
                        left-1/3
                        h-72
                        w-72
                        rounded-full
                        bg-pink-600/10
                        blur-[100px]
                    "
                />
            </div>

            {/* =====================================================
                MAIN
            ====================================================== */}

            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-3
                    py-6
                    sm:px-5
                    sm:py-8
                "
            >
                <div
                    className="
                        w-full
                        max-w-[430px]
                        pt-14
                        lg:pt-16
                    "
                >
                    {/* =================================================
                        HEADER
                    ================================================== */}

                    <div className="mb-5 text-center">
                        <h1
                            className="
                                text-2xl
                                font-extrabold
                                tracking-tight
                                sm:text-3xl
                            "
                        >
                            Flip Coin
                        </h1>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                                sm:text-sm
                            "
                        >
                            Heads or tails?
                        </p>
                    </div>

                    {/* =================================================
                        MAIN CARD
                    ================================================== */}

                    <div
                        className="
                            rounded-[28px]
                            border
                            border-white/[0.08]
                            bg-white/[0.035]
                            p-4
                            shadow-2xl
                            shadow-black/30
                            backdrop-blur-2xl
                            sm:p-5
                        "
                    >
                        {/* =================================================
                            COIN AREA
                        ================================================== */}

                        <div className="flex flex-col items-center">
                            <div
                                className="
                                    relative
                                    flex
                                    h-[210px]
                                    w-[210px]
                                    items-center
                                    justify-center
                                    sm:h-[230px]
                                    sm:w-[230px]
                                "
                            >
                                {/* Coin Glow */}

                                <div
                                    className={`
                                        absolute
                                        inset-8
                                        rounded-full
                                        blur-[50px]
                                        transition-all
                                        duration-500

                                        ${result === "Heads"
                                            ? "bg-yellow-400/20"
                                            : "bg-blue-500/20"
                                        }

                                        ${isFlipping
                                            ? "scale-110 opacity-80"
                                            : "scale-100 opacity-100"
                                        }
                                    `}
                                />

                                {/* =================================================
                                    REAL COIN IMAGE
                                ================================================== */}

                                <div
                                    className={`
                                        relative
                                        z-10
                                        flex
                                        h-[175px]
                                        w-[175px]
                                        items-center
                                        justify-center
                                        transition-all
                                        duration-300
                                        sm:h-[195px]
                                        sm:w-[195px]

                                        ${isFlipping
                                            ? "animate-[coinFlip_1.5s_ease-in-out]"
                                            : ""
                                        }
                                    `}
                                >
                                    <img
                                        src={coinImage}
                                        alt={
                                            result === "Heads"
                                                ? "Heads coin"
                                                : "Tails coin"
                                        }
                                        draggable="false"
                                        className="
                                            h-full
                                            w-full
                                            select-none
                                            object-contain
                                            drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]
                                        "
                                    />
                                </div>
                            </div>

                            {/* =================================================
                                RESULT
                            ================================================== */}

                            <div className="mt-1 text-center">
                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        rounded-full
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.04]
                                        px-4
                                        py-2
                                    "
                                >
                                    <h2
                                        className={`
                                            text-sm
                                            font-bold
                                            sm:text-base

                                            ${isFlipping
                                                ? "text-violet-400"
                                                : result ===
                                                    "Heads"
                                                    ? "text-yellow-400"
                                                    : "text-blue-400"
                                            }
                                        `}
                                    >
                                        {isFlipping
                                            ? "Flipping..."
                                            : result}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            BUTTONS
                        ================================================== */}

                        <div
                            className="
                                mt-6
                                flex
                                items-center
                                justify-center
                                gap-2.5
                            "
                        >
                            {/* Flip */}

                            <button
                                type="button"
                                onClick={flipCoin}
                                disabled={isFlipping}
                                className="
                                    inline-flex
                                    min-h-[46px]
                                    flex-1
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-violet-400/20
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-purple-600
                                    px-4
                                    py-2.5
                                    text-xs
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-violet-500/20
                                    transition-all
                                    duration-200
                                    hover:from-violet-500
                                    hover:to-purple-500
                                    active:scale-95
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    sm:text-sm
                                "
                            >
                                <span className="text-sm">
                                    🔄
                                </span>

                                {isFlipping
                                    ? "Flipping..."
                                    : "Flip Coin"}
                            </button>

                            {/* Reset */}

                            <button
                                type="button"
                                onClick={resetStats}
                                disabled={isFlipping}
                                className="
                                    inline-flex
                                    min-h-[46px]
                                    items-center
                                    justify-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-red-400/20
                                    bg-red-400/[0.07]
                                    px-4
                                    py-2.5
                                    text-xs
                                    font-bold
                                    text-red-400
                                    transition-all
                                    duration-200
                                    hover:border-red-400/40
                                    hover:bg-red-400/15
                                    active:scale-95
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    sm:px-5
                                    sm:text-sm
                                "
                            >
                                <span>↻</span>
                                Reset
                            </button>
                        </div>

                        {/* =================================================
                            STATS
                        ================================================== */}

                        <div
                            className="
                                mt-5
                                grid
                                grid-cols-3
                                gap-2.5
                                sm:gap-3
                            "
                        >
                            {/* Total */}

                            <div
                                className="
                                    rounded-[18px]
                                    border
                                    border-blue-400/10
                                    bg-blue-400/[0.05]
                                    p-3
                                    text-center
                                    sm:rounded-[20px]
                                    sm:p-4
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        mb-2
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-[9px]
                                        bg-blue-400/10
                                    "
                                >
                                    <span className="text-xs">
                                        🎯
                                    </span>
                                </div>

                                <h3
                                    className="
                                        text-xl
                                        font-extrabold
                                        text-blue-400
                                        sm:text-2xl
                                    "
                                >
                                    {totalFlips}
                                </h3>

                                <p
                                    className="
                                        mt-0.5
                                        text-[9px]
                                        font-medium
                                        text-slate-500
                                        sm:text-[10px]
                                    "
                                >
                                    Total
                                </p>
                            </div>

                            {/* Heads */}

                            <div
                                className="
                                    rounded-[18px]
                                    border
                                    border-yellow-400/10
                                    bg-yellow-400/[0.05]
                                    p-3
                                    text-center
                                    sm:rounded-[20px]
                                    sm:p-4
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        mb-2
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-[9px]
                                        bg-yellow-400/10
                                    "
                                >
                                    <img
                                        src={Head}
                                        alt="Heads"
                                        className="h-5 w-5 object-contain"
                                    />
                                </div>

                                <h3
                                    className="
                                        text-xl
                                        font-extrabold
                                        text-yellow-400
                                        sm:text-2xl
                                    "
                                >
                                    {headsCount}
                                </h3>

                                <p
                                    className="
                                        mt-0.5
                                        text-[9px]
                                        font-medium
                                        text-slate-500
                                        sm:text-[10px]
                                    "
                                >
                                    Heads
                                </p>
                            </div>

                            {/* Tails */}

                            <div
                                className="
                                    rounded-[18px]
                                    border
                                    border-violet-400/10
                                    bg-violet-400/[0.05]
                                    p-3
                                    text-center
                                    sm:rounded-[20px]
                                    sm:p-4
                                "
                            >
                                <div
                                    className="
                                        mx-auto
                                        mb-2
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-[9px]
                                        bg-violet-400/10
                                    "
                                >
                                    <img
                                        src={Tail}
                                        alt="Tails"
                                        className="h-5 w-5 object-contain"
                                    />
                                </div>

                                <h3
                                    className="
                                        text-xl
                                        font-extrabold
                                        text-violet-400
                                        sm:text-2xl
                                    "
                                >
                                    {tailsCount}
                                </h3>

                                <p
                                    className="
                                        mt-0.5
                                        text-[9px]
                                        font-medium
                                        text-slate-500
                                        sm:text-[10px]
                                    "
                                >
                                    Tails
                                </p>
                            </div>
                        </div>

                        {/* =================================================
                            STATISTICS
                        ================================================== */}

                        {totalFlips > 0 && (
                            <div
                                className="
                                    mt-5
                                    rounded-[22px]
                                    border
                                    border-white/[0.06]
                                    bg-black/10
                                    p-4
                                "
                            >
                                <div
                                    className="
                                        mb-4
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-bold
                                                text-white
                                            "
                                        >
                                            Flip Statistics
                                        </p>

                                        <p
                                            className="
                                                mt-0.5
                                                text-[9px]
                                                text-slate-600
                                            "
                                        >
                                            Current distribution
                                        </p>
                                    </div>

                                    <span
                                        className="
                                            rounded-full
                                            border
                                            border-white/[0.06]
                                            bg-white/[0.04]
                                            px-2.5
                                            py-1
                                            text-[9px]
                                            font-medium
                                            text-slate-500
                                        "
                                    >
                                        {totalFlips} flips
                                    </span>
                                </div>

                                {/* Heads Percentage */}

                                <div className="mb-4">
                                    <div
                                        className="
                                            mb-1.5
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-yellow-400" />

                                            <span className="text-[10px] font-medium text-slate-400">
                                                Heads
                                            </span>
                                        </div>

                                        <span className="text-[10px] font-bold text-yellow-400">
                                            {headsPercentage.toFixed(1)}%
                                        </span>
                                    </div>

                                    <div
                                        className="
                                            h-2
                                            overflow-hidden
                                            rounded-full
                                            bg-white/[0.06]
                                        "
                                    >
                                        <div
                                            className="
                                                h-full
                                                rounded-full
                                                bg-gradient-to-r
                                                from-yellow-500
                                                to-orange-400
                                                transition-all
                                                duration-500
                                            "
                                            style={{
                                                width: `${headsPercentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Tails Percentage */}

                                <div>
                                    <div
                                        className="
                                            mb-1.5
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-violet-400" />

                                            <span className="text-[10px] font-medium text-slate-400">
                                                Tails
                                            </span>
                                        </div>

                                        <span className="text-[10px] font-bold text-violet-400">
                                            {tailsPercentage.toFixed(1)}%
                                        </span>
                                    </div>

                                    <div
                                        className="
                                            h-2
                                            overflow-hidden
                                            rounded-full
                                            bg-white/[0.06]
                                        "
                                    >
                                        <div
                                            className="
                                                h-full
                                                rounded-full
                                                bg-gradient-to-r
                                                from-violet-600
                                                to-purple-400
                                                transition-all
                                                duration-500
                                            "
                                            style={{
                                                width: `${tailsPercentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* =================================================
                        FOOTER TEXT
                    ================================================== */}

                    <div className="mt-4 text-center">
                        <p
                            className="
                                text-[10px]
                                text-slate-600
                                sm:text-xs
                            "
                        >
                            Flip the coin and test your luck
                        </p>
                    </div>
                </div>
            </div>

            {/* =========================================================
                COIN ANIMATION
            ========================================================== */}

            <style>
                {`
                    @keyframes coinFlip {
                        0% {
                            transform: rotateY(0deg) scale(1);
                        }

                        20% {
                            transform: rotateY(180deg) scale(1.05);
                        }

                        40% {
                            transform: rotateY(360deg) scale(1);
                        }

                        60% {
                            transform: rotateY(540deg) scale(1.05);
                        }

                        80% {
                            transform: rotateY(720deg) scale(1);
                        }

                        100% {
                            transform: rotateY(900deg) scale(1);
                        }
                    }
                `}
            </style>
        </div>
    );
}
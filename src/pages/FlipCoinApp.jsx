import { useState } from "react";

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
            const randomResult = Math.random() < 0.5 ? "Heads" : "Tails";

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
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">
                <h1 className="text-center text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    🪙 Flip Coin App
                </h1>

                {/* Coin */}
                <div className="flex justify-center mb-8">
                    <div
                        className={`w-44 h-44 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-8 border-yellow-300
            ${result === "Heads"
                                ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                : "bg-gradient-to-br from-blue-500 to-indigo-700"
                            }
            ${isFlipping ? "animate-spin" : ""}
          `}
                    >
                        {result === "Heads" ? "👑" : "🦅"}
                    </div>
                </div>

                {/* Result */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {isFlipping ? "Flipping..." : result}
                    </h2>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={flipCoin}
                        disabled={isFlipping}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all disabled:opacity-50"
                    >
                        {isFlipping ? "Flipping..." : "Flip Coin"}
                    </button>

                    <button
                        onClick={resetStats}
                        className="px-5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition"
                    >
                        Reset
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-4 text-center">
                        <h3 className="text-3xl font-bold text-blue-700">
                            {totalFlips}
                        </h3>
                        <p className="font-medium">Total</p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl p-4 text-center">
                        <h3 className="text-3xl font-bold text-yellow-700">
                            {headsCount}
                        </h3>
                        <p className="font-medium">Heads</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl p-4 text-center">
                        <h3 className="text-3xl font-bold text-purple-700">
                            {tailsCount}
                        </h3>
                        <p className="font-medium">Tails</p>
                    </div>
                </div>

                {/* Percentage */}
                {totalFlips > 0 && (
                    <div className="mt-8 space-y-3">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Heads</span>
                                <span>
                                    {((headsCount / totalFlips) * 100).toFixed(1)}%
                                </span>
                            </div>

                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-500"
                                    style={{
                                        width: `${(headsCount / totalFlips) * 100
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Tails</span>
                                <span>
                                    {((tailsCount / totalFlips) * 100).toFixed(1)}%
                                </span>
                            </div>

                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-purple-600"
                                    style={{
                                        width: `${(tailsCount / totalFlips) * 100
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
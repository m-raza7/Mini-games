import { useState } from "react";
import { Check, X } from "lucide-react";
import Confetti from "react-confetti";

const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

export default function RightWrongGame() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("right");
    const [winner, setWinner] = useState(null);
    const [showWinnerModal, setShowWinnerModal] = useState(true);

    const checkWinner = (currentBoard) => {
        for (let pattern of WINNING_PATTERNS) {
            const [a, b, c] = pattern;

            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return currentBoard[a];
            }
        }

        return null;
    };



    const handleClick = (index) => {
        if (board[index] || winner) return;

        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;

        // Check if someone won
        const gameWinner = checkWinner(updatedBoard);

        // Update board
        setBoard(updatedBoard);

        // Show winner popup
        if (gameWinner) {
            setWinner(gameWinner);
            setShowWinnerModal(true);
            return;
        }

        // Change turn
        setCurrentPlayer(
            currentPlayer === "right" ? "wrong" : "right"
        );
    };
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("right");
        setWinner(null);
        setShowWinnerModal(false);
    };

    const isDraw =
        !winner &&
        board.every((cell) => cell !== null);

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#050816] text-white relative">
            {/* Background Glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
                <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-blue-600/15 blur-[120px]" />
                <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-pink-600/10 blur-[100px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-3 py-6 sm:px-5 sm:py-8">

                <div className="w-full max-w-[430px] pt-10 lg:pt-16">

                    {/* Header */}
                    <div className="mb-5 text-center">

                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                            <span className="text-green-400">✅</span>
                            <span className="mx-2 text-white/30">vs</span>
                            <span className="text-red-400">❌</span>
                        </h1>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Classic battle • Best of luck!
                        </p>
                    </div>


                    {/* Game Card */}
                    <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-5">

                        {/* Turn Indicator */}
                        {!winner && !isDraw && (
                            <div className="mb-5 flex items-center justify-center">

                                <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/20 px-4 py-2 backdrop-blur-md">

                                    <span className="text-xs font-medium text-slate-500">
                                        Turn
                                    </span>

                                    {currentPlayer === "right" ? (
                                        <>
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                                                <Check
                                                    size={14}
                                                    strokeWidth={3}
                                                    className="text-green-400"
                                                />
                                            </span>

                                            <span className="text-xs font-bold text-green-400">
                                                Right
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10">
                                                <X
                                                    size={14}
                                                    strokeWidth={3}
                                                    className="text-red-400"
                                                />
                                            </span>

                                            <span className="text-xs font-bold text-red-400">
                                                Wrong
                                            </span>
                                        </>
                                    )}

                                </div>
                            </div>
                        )}


                        {/* Draw */}
                        {isDraw && (
                            <div className="mb-5 flex justify-center">

                                <div className="rounded-full border border-orange-400/20 bg-orange-400/10 px-5 py-2">

                                    <h2 className="text-sm font-bold text-orange-400 sm:text-base">
                                        🤝 Draw Match
                                    </h2>

                                </div>
                            </div>
                        )}


                        {/* Game Board */}
                        <div className="mx-auto grid w-fit grid-cols-3 gap-2.5 sm:gap-3">

                            {board.map((cell, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleClick(index)}
                                    className={`
                                group
                                flex
                                h-[78px]
                                w-[78px]
                                items-center
                                justify-center
                                rounded-[20px]
                                border
                                bg-black/20
                                shadow-lg
                                backdrop-blur-md
                                transition-all
                                duration-200
                                active:scale-90
                                sm:h-[92px]
                                sm:w-[92px]
                                sm:rounded-[24px]

                                ${cell === "right"
                                            ? "border-green-400/20 bg-green-400/[0.05] shadow-green-500/5"
                                            : cell === "wrong"
                                                ? "border-red-400/20 bg-red-400/[0.05] shadow-red-500/5"
                                                : "border-white/[0.08] hover:border-violet-400/30 hover:bg-white/[0.05] hover:scale-[1.03]"
                                        }
                            `}
                                >

                                    {cell === "right" && (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-green-400/10 sm:h-14 sm:w-14 sm:rounded-[17px]">
                                            <Check
                                                className="h-8 w-8 text-green-400 sm:h-10 sm:w-10"
                                                strokeWidth={3}
                                            />
                                        </div>
                                    )}

                                    {cell === "wrong" && (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-red-400/10 sm:h-14 sm:w-14 sm:rounded-[17px]">
                                            <X
                                                className="h-8 w-8 text-red-400 sm:h-10 sm:w-10"
                                                strokeWidth={3}
                                            />
                                        </div>
                                    )}

                                    {!cell && (
                                        <span className="h-2 w-2 rounded-full bg-white/5 transition-all duration-200 group-hover:bg-violet-400/40" />
                                    )}

                                </button>
                            ))}

                        </div>


                        {/* Game Status */}
                        <div className="mt-5 flex items-center justify-center gap-5 text-[11px] text-slate-500">

                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-green-400" />
                                Right
                            </div>

                            <div className="h-3 w-px bg-white/10" />

                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-red-400" />
                                Wrong
                            </div>

                        </div>


                        {/* Reset Button */}
                        <div className="mt-5 flex justify-center">

                            <button
                                onClick={resetGame}
                                className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/[0.08]
                            bg-white/[0.05]
                            px-5
                            py-2.5
                            text-xs
                            font-semibold
                            text-slate-300
                            shadow-lg
                            backdrop-blur-xl
                            transition-all
                            duration-200
                            hover:border-violet-400/30
                            hover:bg-violet-500/10
                            hover:text-white
                            active:scale-95
                            sm:px-6
                        "
                            >
                                ↻
                                <span className="ml-1.5">
                                    Reset Game
                                </span>
                            </button>

                        </div>

                    </div>


                    {/* Footer */}
                    <div className="mt-4 text-center">

                        <p className="text-[10px] text-slate-600 sm:text-xs">
                            Tap a cell to make your move
                        </p>

                    </div>

                </div>
            </div>


            {/* Winner Modal */}
            {winner && showWinnerModal && (
                <>
                    {/* Confetti */}
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={500}
                    />

                    {/* Overlay */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">

                        <div className="
                    relative
                    w-full
                    max-w-[360px]
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/[0.1]
                    bg-[#0c1020]/95
                    p-6
                    text-center
                    shadow-2xl
                    shadow-black/50
                    backdrop-blur-2xl
                    sm:p-7
                ">

                            {/* Modal Glow */}
                            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[70px]" />


                            {/* Close Button */}
                            <button
                                onClick={() => setShowWinnerModal(false)}
                                className="
                            absolute
                            right-3
                            top-3
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/[0.08]
                            bg-white/[0.06]
                            text-slate-400
                            transition
                            hover:bg-red-500/10
                            hover:text-red-400
                            active:scale-90
                        "
                            >
                                <X size={15} strokeWidth={2.5} />
                            </button>


                            {/* Trophy */}
                            <div className="relative mb-4">

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-yellow-400/10 bg-yellow-400/[0.07] shadow-xl shadow-yellow-500/5 sm:h-24 sm:w-24">

                                    <span className="text-5xl sm:text-6xl">
                                        🏆
                                    </span>

                                </div>

                            </div>


                            {/* Title */}
                            <h1 className="relative text-2xl font-extrabold tracking-tight sm:text-3xl">
                                Winner!
                            </h1>

                            <p className="mt-1 text-xs text-slate-500">
                                The match has been decided
                            </p>


                            {/* Winner Icon */}
                            <div className="my-5">

                                {winner === "right" ? (
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-green-400/20 bg-green-400/10">
                                        <Check
                                            className="h-12 w-12 text-green-400"
                                            strokeWidth={3}
                                        />
                                    </div>
                                ) : (
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-red-400/20 bg-red-400/10">
                                        <X
                                            className="h-12 w-12 text-red-400"
                                            strokeWidth={3}
                                        />
                                    </div>
                                )}

                            </div>


                            {/* Winner Text */}
                            <p className="text-lg font-bold sm:text-xl">

                                {winner === "right" ? (
                                    <span className="text-green-400">
                                        Right Player Wins!
                                    </span>
                                ) : (
                                    <span className="text-red-400">
                                        Wrong Player Wins!
                                    </span>
                                )}

                            </p>


                            {/* Actions */}
                            <div className="mt-6 flex items-center justify-center gap-2.5">

                                <button
                                    onClick={() => {
                                        resetGame();
                                        setShowWinnerModal(false);
                                    }}
                                    className="
                                rounded-full
                                bg-gradient-to-r
                                from-violet-600
                                to-purple-600
                                px-5
                                py-2.5
                                text-xs
                                font-bold
                                text-white
                                shadow-lg
                                shadow-violet-500/20
                                transition
                                hover:from-violet-500
                                hover:to-purple-500
                                active:scale-95
                            "
                                >
                                    Play Again
                                </button>

                                <button
                                    onClick={() => setShowWinnerModal(false)}
                                    className="
                                rounded-full
                                border
                                border-white/[0.08]
                                bg-white/[0.05]
                                px-5
                                py-2.5
                                text-xs
                                font-semibold
                                text-slate-300
                                transition
                                hover:bg-white/[0.08]
                                hover:text-white
                                active:scale-95
                            "
                                >
                                    Close
                                </button>

                            </div>

                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
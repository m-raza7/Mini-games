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
        <div className="min-h-screen bg-gradient-to-br from-violet-600 via-pink-500 to-orange-400 flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-center mb-6">
                    ✅ vs ❌
                </h1>

                {!winner && !isDraw && (
                    <div className="text-center mb-6 text-xl font-semibold">
                        Turn:
                        {currentPlayer === "right" ? (
                            <span className="ml-2 text-green-600">
                                ✅ Right
                            </span>
                        ) : (
                            <span className="ml-2 text-red-600">
                                ❌ Wrong
                            </span>
                        )}
                    </div>
                )}

                {winner && showWinnerModal && (
                    <>
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            recycle={false}
                            numberOfPieces={500}
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div className="relative bg-white rounded-3xl p-10 shadow-2xl text-center max-w-md w-full mx-4">

                                {/* Close Button */}
                                <button
                                    onClick={() => setShowWinnerModal(false)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 text-white text-xl font-bold hover:bg-red-600 transition"
                                >
                                    ✕
                                </button>

                                <div className="text-7xl mb-4">🏆</div>

                                <h1 className="text-4xl font-extrabold mb-4">
                                    Winner!
                                </h1>

                                <div className="mb-4">
                                    {winner === "right" ? (
                                        <div className="text-8xl">✅</div>
                                    ) : (
                                        <div className="text-8xl">❌</div>
                                    )}
                                </div>

                                <p className="text-2xl font-bold mb-6">
                                    {winner === "right"
                                        ? "Right Player Wins!"
                                        : "Wrong Player Wins!"}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            resetGame();
                                            setShowWinnerModal(false);
                                        }}
                                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold"
                                    >
                                        Play Again
                                    </button>

                                    <button
                                        onClick={() => setShowWinnerModal(false)}
                                        className="flex-1 py-3 rounded-xl bg-slate-200 font-bold"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}


                {isDraw && (
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-orange-500">
                            🤝 Draw Match
                        </h2>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                    {board.map((cell, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center hover:scale-105 transition"
                        >
                            {cell === "right" && (
                                <Check
                                    size={50}
                                    strokeWidth={3}
                                    className="text-green-600"
                                />
                            )}

                            {cell === "wrong" && (
                                <X
                                    size={50}
                                    strokeWidth={3}
                                    className="text-red-600"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={resetGame}
                    className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold"
                >
                    Reset Game
                </button>
            </div>
        </div>
    );
}
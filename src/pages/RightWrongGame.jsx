import { useState } from "react";

const questions = [
    {
        question: "The Sun rises in the East.",
        answer: true,
    },
    {
        question: "India has 50 states.",
        answer: false,
    },
    {
        question: "React is a JavaScript library.",
        answer: true,
    },
    {
        question: "HTML is a programming language.",
        answer: false,
    },
    {
        question: "The Earth is flat.",
        answer: false,
    },
];

export default function RightWrongGame() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (userAnswer) => {
        const isCorrect =
            userAnswer === questions[current].answer;

        if (isCorrect) {
            setScore((prev) => prev + 1);
            setFeedback("correct");
        } else {
            setFeedback("wrong");
        }

        setTimeout(() => {
            if (current + 1 < questions.length) {
                setCurrent((prev) => prev + 1);
                setFeedback(null);
            } else {
                setFinished(true);
            }
        }, 1000);
    };

    const restartGame = () => {
        setCurrent(0);
        setScore(0);
        setFeedback(null);
        setFinished(false);
    };

    if (finished) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl">
                    <h1 className="text-4xl font-bold mb-4">
                        🎉 Game Over
                    </h1>

                    <h2 className="text-3xl font-bold text-purple-600 mb-6">
                        Score: {score}/{questions.length}
                    </h2>

                    <button
                        onClick={restartGame}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        );
    }

    const question = questions[current];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-3 sm:p-6 ">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-8">

                    <span className="font-bold text-lg sm:text-xl">
                        Question {current + 1}/{questions.length}
                    </span>

                    <span className="font-bold text-lg sm:text-xl text-purple-600">
                        Score: {score}
                    </span>

                </div>

                {/* Question */}
                <div
                    className={`rounded-3xl p-6 sm:p-10 text-center mb-8 transition-all
            ${feedback === "correct"
                            ? "bg-green-100 border-4 border-green-500"
                            : feedback === "wrong"
                                ? "bg-red-100 border-4 border-red-500"
                                : "bg-gradient-to-r from-indigo-100 to-pink-100"
                        }`}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold break-words">
                        {question.question}
                    </h2>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <button
                        onClick={() => handleAnswer(true)}
                        disabled={feedback}
                        className="bg-green-500 hover:bg-green-600 text-white py-4 sm:py-5 rounded-2xl text-xl sm:text-2xl font-bold transition"
                    >
                        ✅ Right
                    </button>

                    <button
                        onClick={() => handleAnswer(false)}
                        disabled={feedback}
                        className="bg-red-500 hover:bg-red-600 text-white py-4 sm:py-5 rounded-2xl text-xl sm:text-2xl font-bold transition"
                    >
                        ❌ Wrong
                    </button>

                </div>

                {/* Feedback */}
                {feedback === "correct" && (
                    <div className="mt-6 text-center text-green-600 text-2xl sm:text-3xl font-bold animate-bounce">
                        🎉 Correct!
                    </div>
                )}

                {feedback === "wrong" && (
                    <div className="mt-6 text-center text-red-600 text-2xl sm:text-3xl font-bold animate-bounce">
                        😢 Wrong!
                    </div>
                )}

            </div>
        </div>
    );
}
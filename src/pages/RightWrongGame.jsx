import { useMemo, useState } from "react";
import {
    ArrowLeft,
    Check,
    ChevronRight,
    CircleHelp,
    RotateCcw,
    Trophy,
    X,
} from "lucide-react";

/* =========================================================
   QUIZ DATA
========================================================= */

const quizCategories = [
    {
        id: "wildlife",
        title: "Wildlife & Wild Animals",
        description: "Discover amazing facts about wild animals.",
        emoji: "🦁",
        color: "from-emerald-500 to-green-600",
        questions: [
            {
                question:
                    "A cheetah is one of the fastest land animals.",
                answer: true,
            },
            {
                question:
                    "Elephants are the smallest land mammals.",
                answer: false,
            },
            {
                question: "Tigers are carnivores.",
                answer: true,
            },
            {
                question:
                    "Giraffes have very short necks.",
                answer: false,
            },
            {
                question:
                    "A group of lions is called a pride.",
                answer: true,
            },
            {
                question:
                    "Polar bears naturally live in Antarctica.",
                answer: false,
            },
            {
                question:
                    "Zebras have unique stripe patterns.",
                answer: true,
            },
            {
                question:
                    "Rhinoceroses are herbivores.",
                answer: true,
            },
            {
                question:
                    "Kangaroos are native to Australia.",
                answer: true,
            },
            {
                question:
                    "Lions are generally social animals that live in groups.",
                answer: true,
            },
        ],
    },

    {
        id: "ocean",
        title: "Ocean & Sea Life",
        description:
            "Explore fascinating facts beneath the waves.",
        emoji: "🌊",
        color: "from-cyan-500 to-blue-600",
        questions: [
            {
                question: "Whales are mammals.",
                answer: true,
            },
            {
                question: "Dolphins breathe air.",
                answer: true,
            },
            {
                question: "Sharks are mammals.",
                answer: false,
            },
            {
                question:
                    "Octopuses have eight arms.",
                answer: true,
            },
            {
                question:
                    "Coral reefs are living ecosystems.",
                answer: true,
            },
            {
                question:
                    "Sea turtles can breathe underwater forever.",
                answer: false,
            },
            {
                question:
                    "Jellyfish have a backbone.",
                answer: false,
            },
            {
                question:
                    "Blue whales are among the largest animals on Earth.",
                answer: true,
            },
            {
                question:
                    "Seahorses are fish.",
                answer: true,
            },
            {
                question:
                    "All sharks are dangerous to humans.",
                answer: false,
            },
        ],
    },

    {
        id: "nature",
        title: "Nature & Earth",
        description:
            "Test what you know about our amazing planet.",
        emoji: "🌿",
        color: "from-lime-500 to-emerald-600",
        questions: [
            {
                question:
                    "Plants need sunlight for photosynthesis.",
                answer: true,
            },
            {
                question:
                    "Rainforests contain many different species.",
                answer: true,
            },
            {
                question:
                    "The Earth is a planet.",
                answer: true,
            },
            {
                question:
                    "Mount Everest is the tallest mountain above sea level.",
                answer: true,
            },
            {
                question:
                    "Trees can release oxygen through photosynthesis.",
                answer: true,
            },
            {
                question:
                    "Deserts always receive heavy rainfall.",
                answer: false,
            },
            {
                question:
                    "Rivers can flow into oceans.",
                answer: true,
            },
            {
                question:
                    "Volcanoes can release lava.",
                answer: true,
            },
            {
                question:
                    "The Moon is a star.",
                answer: false,
            },
            {
                question:
                    "Earth has one natural satellite called the Moon.",
                answer: true,
            },
        ],
    },

    {
        id: "animals",
        title: "Animal World",
        description:
            "How much do you know about the animal kingdom?",
        emoji: "🐾",
        color: "from-amber-500 to-orange-600",
        questions: [
            {
                question: "Dogs are mammals.",
                answer: true,
            },
            {
                question: "Birds have feathers.",
                answer: true,
            },
            {
                question:
                    "Fish normally breathe using gills.",
                answer: true,
            },
            {
                question: "Bats are birds.",
                answer: false,
            },
            {
                question:
                    "Penguins can fly through the air like eagles.",
                answer: false,
            },
            {
                question: "Frogs are amphibians.",
                answer: true,
            },
            {
                question: "Snakes are reptiles.",
                answer: true,
            },
            {
                question:
                    "Butterflies begin life as caterpillars.",
                answer: true,
            },
            {
                question:
                    "Spiders are insects.",
                answer: false,
            },
            {
                question:
                    "Bees help pollinate many plants.",
                answer: true,
            },
        ],
    },

    {
        id: "geography",
        title: "World & Geography",
        description:
            "Explore countries, continents and our world.",
        emoji: "🌍",
        color: "from-blue-500 to-indigo-600",
        questions: [
            {
                question: "India is in Asia.",
                answer: true,
            },
            {
                question:
                    "Australia is both a country and a continent.",
                answer: true,
            },
            {
                question:
                    "The Pacific Ocean is an ocean.",
                answer: true,
            },
            {
                question: "Africa is a country.",
                answer: false,
            },
            {
                question:
                    "The Sahara is a desert.",
                answer: true,
            },
            {
                question:
                    "The Amazon rainforest is primarily in South America.",
                answer: true,
            },
            {
                question:
                    "Japan is an island country.",
                answer: true,
            },
            {
                question:
                    "The North Pole is located in Antarctica.",
                answer: false,
            },
            {
                question:
                    "The Equator passes through several countries.",
                answer: true,
            },
            {
                question:
                    "Mount Everest is located in the Himalayas.",
                answer: true,
            },
        ],
    },

    {
        id: "general",
        title: "General Knowledge",
        description:
            "A mixed challenge covering everyday knowledge.",
        emoji: "🧠",
        color: "from-violet-500 to-purple-600",
        questions: [
            {
                question:
                    "Water freezes at 0°C under standard conditions.",
                answer: true,
            },
            {
                question: "The Sun is a star.",
                answer: true,
            },
            {
                question:
                    "Humans have four lungs.",
                answer: false,
            },
            {
                question:
                    "The Earth revolves around the Sun.",
                answer: true,
            },
            {
                question:
                    "There are seven days in a week.",
                answer: true,
            },
            {
                question:
                    "A triangle has four sides.",
                answer: false,
            },
            {
                question:
                    "The human body has a skeleton.",
                answer: true,
            },
            {
                question:
                    "HTML stands for HyperText Markup Language.",
                answer: true,
            },
            {
                question:
                    "React is a JavaScript library.",
                answer: true,
            },
            {
                question:
                    "The Moon produces its own sunlight.",
                answer: false,
            },
        ],
    },
];

/* =========================================================
   CATEGORY CARD
========================================================= */

function CategoryCard({
    category,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={() => onClick(category)}
            className="
                group
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-4
                text-left
                shadow-xl
                shadow-black/20
                backdrop-blur-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/[0.16]
                hover:bg-white/[0.06]
                active:scale-[0.98]
                focus:outline-none
                focus:ring-2
                focus:ring-violet-500/40
                sm:p-5
            "
        >
            {/* Glow */}
            <div
                className={`
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-32
                    w-32
                    rounded-full
                    bg-gradient-to-br
                    ${category.color}
                    opacity-[0.10]
                    blur-3xl
                    transition-all
                    duration-300
                    group-hover:opacity-[0.20]
                `}
            />

            <div className="relative flex items-start justify-between">
                <div
                    className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-[15px]
                        bg-gradient-to-br
                        ${category.color}
                        text-2xl
                        shadow-lg
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    `}
                >
                    {category.emoji}
                </div>

                <div
                    className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.07]
                        bg-white/[0.03]
                        text-slate-500
                        transition-all
                        duration-300
                        group-hover:border-violet-400/20
                        group-hover:bg-violet-400/10
                        group-hover:text-violet-300
                    "
                >
                    <ChevronRight size={16} />
                </div>
            </div>

            <div className="relative mt-5">
                <h3
                    className="
                        text-base
                        font-bold
                        tracking-tight
                        text-white
                        sm:text-lg
                    "
                >
                    {category.title}
                </h3>

                <p
                    className="
                        mt-1.5
                        min-h-[40px]
                        text-xs
                        leading-5
                        text-slate-400
                        sm:text-sm
                    "
                >
                    {category.description}
                </p>
            </div>

            <div
                className="
                    relative
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/[0.06]
                    pt-3
                "
            >
                <span className="text-[10px] font-medium text-slate-500 sm:text-xs">
                    10 Questions
                </span>

                <span className="text-[10px] font-semibold text-violet-300 sm:text-xs">
                    Start Quiz
                </span>
            </div>
        </button>
    );
}

/* =========================================================
   CATEGORY SELECT SCREEN
========================================================= */

function CategoryScreen({
    onSelect,
}) {
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
            <Background />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    min-h-screen
                    w-full
                    max-w-5xl
                    px-3
                    pb-10
                    pt-20
                    sm:px-5
                    sm:pb-12
                    sm:pt-24
                "
            >
                {/* Header */}
                <header className="mx-auto max-w-2xl text-center">
                    <div
                        className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-[18px]
                            border
                            border-violet-400/15
                            bg-violet-400/[0.08]
                            text-violet-300
                            shadow-lg
                            shadow-violet-500/10
                        "
                    >
                        <CircleHelp size={27} />
                    </div>

                    <h1
                        className="
                            mt-5
                            text-3xl
                            font-black
                            tracking-tight
                            text-white
                            sm:text-4xl
                            md:text-5xl
                        "
                    >
                        Quiz Challenge
                    </h1>

                    <p
                        className="
                            mx-auto
                            mt-3
                            max-w-xl
                            text-sm
                            leading-6
                            text-slate-400
                            sm:text-base
                            sm:leading-7
                        "
                    >
                        Choose a topic and test your knowledge
                        with 10 fun True or False questions.
                    </p>
                </header>

                {/* Categories */}
                <section className="mt-9 sm:mt-11">
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
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-violet-400
                                    sm:text-xs
                                "
                            >
                                Choose a category
                            </p>

                            <h2
                                className="
                                    mt-1
                                    text-lg
                                    font-bold
                                    text-white
                                    sm:text-xl
                                "
                            >
                                Explore & Play
                            </h2>
                        </div>

                        <span
                            className="
                                rounded-full
                                border
                                border-white/[0.06]
                                bg-white/[0.03]
                                px-3
                                py-1.5
                                text-[10px]
                                font-medium
                                text-slate-500
                                sm:text-xs
                            "
                        >
                            {quizCategories.length} Topics
                        </span>
                    </div>

                    <div
                        className="
                            grid
                            gap-3
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {quizCategories.map(
                            (category) => (
                                <CategoryCard
                                    key={category.id}
                                    category={category}
                                    onClick={onSelect}
                                />
                            )
                        )}
                    </div>
                </section>

                {/* Info */}
                <div
                    className="
                        mx-auto
                        mt-6
                        flex
                        max-w-lg
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        border
                        border-white/[0.06]
                        bg-white/[0.025]
                        px-4
                        py-2.5
                        text-center
                    "
                >
                    <Trophy
                        size={14}
                        className="shrink-0 text-yellow-400"
                    />

                    <p className="text-[10px] text-slate-500 sm:text-xs">
                        Answer all 10 questions and see your
                        final score.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   QUIZ SCREEN
========================================================= */

function QuizScreen({
    category,
    onBack,
    onFinished,
}) {
    const questions = category.questions;

    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] =
        useState(null);

    const question = questions[current];

    const progress =
        ((current + 1) / questions.length) * 100;

    const handleAnswer = (userAnswer) => {
        if (feedback) return;

        const isCorrect =
            userAnswer === question.answer;

        if (isCorrect) {
            setScore((prev) => prev + 1);
            setFeedback("correct");
        } else {
            setFeedback("wrong");
        }

        window.setTimeout(() => {
            if (
                current + 1 <
                questions.length
            ) {
                setCurrent(
                    (prev) => prev + 1
                );
                setFeedback(null);
            } else {
                const finalScore =
                    score +
                    (isCorrect ? 1 : 0);

                onFinished(
                    finalScore,
                    questions.length
                );
            }
        }, 850);
    };

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
            <Background />

            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-3
                    py-8
                    sm:px-5
                "
            >
                <div
                    className="
                        w-full
                        max-w-[450px]
                        pt-10
                        sm:pt-12
                    "
                >
                    {/* Top */}
                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <button
                            type="button"
                            onClick={onBack}
                            disabled={Boolean(
                                feedback
                            )}
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.03]
                                px-3
                                py-2
                                text-[10px]
                                font-semibold
                                text-slate-400
                                transition
                                hover:bg-white/[0.06]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                                sm:text-xs
                            "
                        >
                            <ArrowLeft size={14} />

                            Categories
                        </button>

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.03]
                                px-3
                                py-2
                            "
                        >
                            <span className="text-sm">
                                {category.emoji}
                            </span>

                            <span
                                className="
                                    max-w-[130px]
                                    truncate
                                    text-[10px]
                                    font-semibold
                                    text-slate-300
                                    sm:text-xs
                                "
                            >
                                {category.title}
                            </span>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="mb-4 text-center">
                        <h1
                            className="
                                text-2xl
                                font-extrabold
                                tracking-tight
                                sm:text-3xl
                            "
                        >
                            True or False
                        </h1>

                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            {category.description}
                        </p>
                    </div>

                    {/* Main Card */}
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
                        {/* Progress / Score */}
                        <div
                            className="
                                mb-5
                                flex
                                items-center
                                justify-between
                            "
                        >
                            {/* Question */}
                            <div className="flex items-center gap-2">
                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-[11px]
                                        bg-violet-500/10
                                    "
                                >
                                    <span className="text-sm">
                                        📝
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[10px] text-slate-500">
                                        Question
                                    </p>

                                    <p className="text-xs font-bold text-white sm:text-sm">
                                        {current + 1}
                                        <span className="mx-1 text-slate-600">
                                            /
                                        </span>
                                        {questions.length}
                                    </p>
                                </div>
                            </div>

                            {/* Score */}
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500">
                                        Score
                                    </p>

                                    <p className="text-xs font-bold text-violet-400 sm:text-sm">
                                        {score}
                                    </p>
                                </div>

                                <div
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-[11px]
                                        bg-violet-500/10
                                    "
                                >
                                    <Trophy
                                        size={15}
                                        className="text-violet-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-5">
                            <div className="mb-1.5 flex items-center justify-between">
                                <span className="text-[10px] text-slate-600">
                                    Progress
                                </span>

                                <span className="text-[10px] font-medium text-slate-500">
                                    {Math.round(
                                        progress
                                    )}
                                    %
                                </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                                <div
                                    className="
                                        h-full
                                        rounded-full
                                        bg-gradient-to-r
                                        from-violet-500
                                        to-purple-500
                                        transition-all
                                        duration-500
                                    "
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <div
                            className={`
                                relative
                                mb-5
                                overflow-hidden
                                rounded-[24px]
                                border
                                p-6
                                text-center
                                transition-all
                                duration-300
                                sm:p-8

                                ${feedback ===
                                    "correct"
                                    ? "border-green-400/20 bg-green-400/[0.07]"
                                    : feedback ===
                                        "wrong"
                                        ? "border-red-400/20 bg-red-400/[0.07]"
                                        : "border-violet-400/10 bg-gradient-to-br from-violet-500/[0.08] to-pink-500/[0.05]"
                                }
                            `}
                        >
                            <div
                                className={`
                                    pointer-events-none
                                    absolute
                                    left-1/2
                                    top-0
                                    h-24
                                    w-24
                                    -translate-x-1/2
                                    rounded-full
                                    blur-[60px]

                                    ${feedback ===
                                        "correct"
                                        ? "bg-green-400/20"
                                        : feedback ===
                                            "wrong"
                                            ? "bg-red-400/20"
                                            : "bg-violet-400/15"
                                    }
                                `}
                            />

                            <div className="relative mb-4">
                                <span
                                    className={`
                                        inline-flex
                                        items-center
                                        rounded-full
                                        border
                                        px-3
                                        py-1
                                        text-[10px]
                                        font-semibold

                                        ${feedback ===
                                            "correct"
                                            ? "border-green-400/20 bg-green-400/10 text-green-400"
                                            : feedback ===
                                                "wrong"
                                                ? "border-red-400/20 bg-red-400/10 text-red-400"
                                                : "border-violet-400/20 bg-violet-400/10 text-violet-400"
                                        }
                                    `}
                                >
                                    Question{" "}
                                    {current + 1}
                                </span>
                            </div>

                            <h2
                                className="
                                    relative
                                    break-words
                                    text-lg
                                    font-extrabold
                                    leading-relaxed
                                    sm:text-2xl
                                "
                            >
                                {question.question}
                            </h2>
                        </div>

                        {/* Answer Buttons */}
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    handleAnswer(
                                        true
                                    )
                                }
                                disabled={Boolean(
                                    feedback
                                )}
                                className="
                                    group
                                    flex
                                    min-h-[58px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-[18px]
                                    border
                                    border-green-400/20
                                    bg-green-400/[0.07]
                                    px-3
                                    py-3
                                    text-sm
                                    font-bold
                                    text-green-400
                                    transition-all
                                    duration-200
                                    hover:border-green-400/40
                                    hover:bg-green-400/15
                                    active:scale-95
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    sm:min-h-[62px]
                                    sm:rounded-[20px]
                                    sm:text-base
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-[11px]
                                        bg-green-400/10
                                        transition-transform
                                        group-hover:scale-110
                                    "
                                >
                                    <Check
                                        size={18}
                                        strokeWidth={3}
                                    />
                                </span>

                                Right
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    handleAnswer(
                                        false
                                    )
                                }
                                disabled={Boolean(
                                    feedback
                                )}
                                className="
                                    group
                                    flex
                                    min-h-[58px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-[18px]
                                    border
                                    border-red-400/20
                                    bg-red-400/[0.07]
                                    px-3
                                    py-3
                                    text-sm
                                    font-bold
                                    text-red-400
                                    transition-all
                                    duration-200
                                    hover:border-red-400/40
                                    hover:bg-red-400/15
                                    active:scale-95
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                    sm:min-h-[62px]
                                    sm:rounded-[20px]
                                    sm:text-base
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-[11px]
                                        bg-red-400/10
                                        transition-transform
                                        group-hover:scale-110
                                    "
                                >
                                    <X
                                        size={18}
                                        strokeWidth={3}
                                    />
                                </span>

                                Wrong
                            </button>
                        </div>

                        {/* Feedback */}
                        {feedback && (
                            <div className="mt-5 flex justify-center">
                                <div
                                    className={`
                                        flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        px-4
                                        py-2

                                        ${feedback ===
                                            "correct"
                                            ? "border-green-400/20 bg-green-400/10"
                                            : "border-red-400/20 bg-red-400/10"
                                        }
                                    `}
                                >
                                    <span className="text-sm">
                                        {feedback ===
                                            "correct"
                                            ? "🎉"
                                            : "😢"}
                                    </span>

                                    <span
                                        className={`
                                            text-xs
                                            font-bold
                                            sm:text-sm

                                            ${feedback ===
                                                "correct"
                                                ? "text-green-400"
                                                : "text-red-400"
                                            }
                                        `}
                                    >
                                        {feedback ===
                                            "correct"
                                            ? "Correct!"
                                            : "Wrong!"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="mt-4 text-center text-[10px] text-slate-600 sm:text-xs">
                        Choose the correct answer
                    </p>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   RESULT SCREEN
========================================================= */

function ResultScreen({
    category,
    score,
    total,
    onPlayAgain,
    onCategories,
}) {
    const percentage =
        total > 0
            ? Math.round(
                (score / total) * 100
            )
            : 0;

    const result = useMemo(() => {
        if (percentage === 100) {
            return {
                emoji: "🏆",
                title: "Perfect Score!",
                text:
                    "Amazing! You answered every question correctly.",
                className:
                    "border-green-400/20 bg-green-400/10 text-green-400",
            };
        }

        if (percentage >= 70) {
            return {
                emoji: "🎉",
                title: "Great Job!",
                text:
                    "Excellent work! You really know your stuff.",
                className:
                    "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",
            };
        }

        if (percentage >= 50) {
            return {
                emoji: "⭐",
                title: "Good Effort!",
                text:
                    "Nice work! A little more practice will make you even better.",
                className:
                    "border-blue-400/20 bg-blue-400/10 text-blue-400",
            };
        }

        return {
            emoji: "💪",
            title: "Keep Practicing!",
            text:
                "Don't give up. Try the quiz again and improve your score.",
            className:
                "border-violet-400/20 bg-violet-400/10 text-violet-400",
        };
    }, [percentage]);

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
            <Background />

            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-3
                    py-8
                    sm:px-5
                "
            >
                <div className="w-full max-w-[430px] pt-8">
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[28px]
                            border
                            border-white/[0.08]
                            bg-white/[0.035]
                            p-6
                            text-center
                            shadow-2xl
                            shadow-black/40
                            backdrop-blur-2xl
                            sm:p-8
                        "
                    >
                        {/* Glow */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                -top-24
                                left-1/2
                                h-48
                                w-48
                                -translate-x-1/2
                                rounded-full
                                bg-violet-500/20
                                blur-[80px]
                            "
                        />

                        {/* Category */}
                        <div className="relative">
                            <span className="text-3xl">
                                {category.emoji}
                            </span>

                            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-400">
                                {category.title}
                            </p>
                        </div>

                        {/* Icon */}
                        <div
                            className="
                                relative
                                mx-auto
                                mt-5
                                flex
                                h-20
                                w-20
                                items-center
                                justify-center
                                rounded-[24px]
                                border
                                border-yellow-400/10
                                bg-yellow-400/[0.07]
                                shadow-lg
                                shadow-yellow-500/5
                                sm:h-24
                                sm:w-24
                            "
                        >
                            <span className="text-5xl sm:text-6xl">
                                {result.emoji}
                            </span>
                        </div>

                        {/* Title */}
                        <h1
                            className="
                                relative
                                mt-5
                                text-2xl
                                font-extrabold
                                tracking-tight
                                sm:text-3xl
                            "
                        >
                            {result.title}
                        </h1>

                        <p className="relative mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                            {result.text}
                        </p>

                        {/* Score */}
                        <div
                            className="
                                relative
                                mx-auto
                                my-6
                                max-w-[260px]
                                rounded-[22px]
                                border
                                border-violet-400/15
                                bg-violet-500/[0.07]
                                px-5
                                py-4
                            "
                        >
                            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                Final Score
                            </p>

                            <h2
                                className="
                                    bg-gradient-to-r
                                    from-violet-400
                                    to-pink-400
                                    bg-clip-text
                                    text-4xl
                                    font-extrabold
                                    text-transparent
                                    sm:text-5xl
                                "
                            >
                                {score}
                                <span className="mx-1 text-slate-600">
                                    /
                                </span>
                                {total}
                            </h2>

                            <p className="mt-1 text-xs font-semibold text-violet-300">
                                {percentage}% correct
                            </p>
                        </div>

                        {/* Result Badge */}
                        <div className="mb-5">
                            <div
                                className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    px-4
                                    py-2
                                    ${result.className}
                                `}
                            >
                                <Trophy size={14} />

                                <span className="text-xs font-bold">
                                    {score} of {total} correct
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-2.5">
                            <button
                                type="button"
                                onClick={
                                    onPlayAgain
                                }
                                className="
                                    group
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-violet-400/20
                                    bg-gradient-to-r
                                    from-violet-600
                                    to-purple-600
                                    px-5
                                    py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-violet-500/20
                                    transition-all
                                    duration-200
                                    hover:from-violet-500
                                    hover:to-purple-500
                                    hover:shadow-violet-500/30
                                    active:scale-95
                                "
                            >
                                <RotateCcw
                                    size={16}
                                    className="transition-transform duration-300 group-hover:-rotate-45"
                                />

                                Play Again
                            </button>

                            <button
                                type="button"
                                onClick={
                                    onCategories
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.03]
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-300
                                    transition-all
                                    hover:bg-white/[0.07]
                                    hover:text-white
                                    active:scale-95
                                "
                            >
                                <ArrowLeft size={16} />

                                Choose Another Quiz
                            </button>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-[10px] text-slate-600 sm:text-xs">
                        Ready for another challenge?
                    </p>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   BACKGROUND
========================================================= */

function Background() {
    return (
        <>
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
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
        </>
    );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function RightWrongGame() {
    const [selectedCategory, setSelectedCategory] =
        useState(null);

    const [result, setResult] = useState(null);

    const handleCategorySelect = (
        category
    ) => {
        setSelectedCategory(category);
        setResult(null);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setResult(null);
    };

    const handleFinished = (
        score,
        total
    ) => {
        setResult({
            score,
            total,
        });
    };

    const handlePlayAgain = () => {
        setResult(null);
    };

    if (!selectedCategory) {
        return (
            <CategoryScreen
                onSelect={handleCategorySelect}
            />
        );
    }

    if (result) {
        return (
            <ResultScreen
                category={selectedCategory}
                score={result.score}
                total={result.total}
                onPlayAgain={
                    handlePlayAgain
                }
                onCategories={
                    handleBackToCategories
                }
            />
        );
    }

    return (
        <QuizScreen
            category={selectedCategory}
            onBack={
                handleBackToCategories
            }
            onFinished={handleFinished}
        />
    );
}
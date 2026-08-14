import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative w-full">

            {/* Search Icon */}
            <Search
                size={17}
                className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
            sm:size-[18px]
        "
            />

            {/* Input */}
            <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
            h-11
            w-full
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.035]
            py-2.5
            pl-11
            pr-11
            text-xs
            text-white
            shadow-inner
            outline-none
            backdrop-blur-xl
            transition-all
            duration-200
            placeholder:text-slate-600

            focus:border-violet-400/40
            focus:bg-violet-500/[0.04]
            focus:shadow-[0_0_20px_rgba(139,92,246,0.08)]

            sm:h-12
            sm:text-sm
        "
            />

            {/* Clear Button */}
            {searchTerm && (
                <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="
                absolute
                right-2
                top-1/2
                flex
                h-7
                w-7
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.05]
                text-slate-500
                transition-all
                hover:bg-red-400/10
                hover:text-red-400
                active:scale-90
            "
                    aria-label="Clear search"
                >
                    <X size={14} />
                </button>
            )}

        </div>
    );
};

export default SearchBar;
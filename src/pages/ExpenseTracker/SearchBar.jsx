import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative w-full">
            {/* Search Icon */}
            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            {/* Input */}
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
          w-full
          rounded-2xl
          border
          border-gray-300
          bg-white
          py-3
          pl-12
          pr-12
          text-gray-700
          shadow-sm
          outline-none
          transition
          focus:border-purple-500
          focus:ring-2
          focus:ring-purple-200
        "
            />

            {/* Clear Button */}
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm("")}
                    className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-gray-500
            hover:bg-gray-100
            hover:text-red-500
          "
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
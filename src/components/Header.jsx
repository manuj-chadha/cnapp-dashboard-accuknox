import React, { useState, useEffect } from "react";
import { Search, Sun, Moon, Plus } from "lucide-react";

const Header = ({ searchQuery, setSearchQuery, onAddCategoryClick }) => {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-black/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:p-8 flex items-center justify-between h-20">
        <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 text-transparent bg-clip-text">
          CNAPP Dashboard
        </div>

        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              className="placeholder:text-black/50 dark:placeholder:text-white/50 w-full max-w-xs pl-10 pr-4 py-2 rounded-lg border bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Add Category Button */}
          <button
            onClick={onAddCategoryClick}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-all shadow-md"
          >
            <Plus size={18} />
            Add Category
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

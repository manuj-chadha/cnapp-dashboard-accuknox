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

  // Sync theme with <html>
  useEffect(() => {
    const root = document.documentElement;
    const theme = isDarkMode ? "dark" : "light";
    root.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
          CNAPP Dashboard
        </h1>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative w-full max-w-[180px] sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              className="w-full rounded-lg border border-slate-300 bg-slate-100 pl-9 pr-3 py-2 text-sm sm:text-base 
                         dark:border-slate-600 dark:bg-slate-800 
                         placeholder:text-slate-500 dark:placeholder:text-slate-400 
                         focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Add Category */}
          <button
            onClick={onAddCategoryClick}
            className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 
                      rounded-lg bg-violet-600 text-white font-medium shadow-md 
                      transition hover:bg-violet-700"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Category</span>
          </button>


          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 
                       hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

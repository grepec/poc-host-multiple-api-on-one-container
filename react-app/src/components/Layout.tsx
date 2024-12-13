import React from 'react';
import { Sun, Moon, Leaf } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-950 transition-colors duration-200">
      <nav className="bg-white dark:bg-green-900 border-b border-green-100 dark:border-green-800 shadow-lg shadow-green-100/10 dark:shadow-green-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
              <Link to="/" className="text-xl font-bold text-green-800 dark:text-green-100">
                API Docs
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
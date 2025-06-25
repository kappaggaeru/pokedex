import { SunMoon } from 'lucide-react';
import { useEffect } from 'react';

const ThemeButton = () => {

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const theme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (theme === 'dark' || (!theme && prefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    function toggleTheme() {
        const html = document.documentElement;
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    return (
        <button
            className="w-12 h-12 
            bg-white/80 dark:bg-gray-800/80 
            backdrop-blur-md rounded-full
            border border-gray-200/50 dark:border-gray-600/50 shadow-lg flex items-center justify-center  transition-colors duration-200"
            onClick={toggleTheme}
        >
            <SunMoon className="w-6 h-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        </button>
    );
}
export default ThemeButton;
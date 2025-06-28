import { SunMoon } from 'lucide-react';
import { useEffect } from 'react';
import DefaultButton from './default.button';

const ToggleThemeButton = () => {

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
        <DefaultButton onClick={toggleTheme} isVisible={true} icon={SunMoon} />
    );
}
export default ToggleThemeButton;
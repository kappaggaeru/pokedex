import { createContext, ReactNode, useContext, useState } from "react"

interface ThemeContextType {
    currentTheme: string;
    setActiveTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState("light");

    const setActiveTheme = (theme: string) => {
        const html = document.documentElement;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? "dark" : "light";
        const newTheme = theme === "system" ? systemTheme : theme;

        if (newTheme !== currentTheme) {
            html.classList.remove(currentTheme);
            html.classList.add(newTheme);
        }

        setCurrentTheme(newTheme);
    }

    return (
        <ThemeContext value={{ currentTheme, setActiveTheme }}>
            {children}
        </ThemeContext>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}
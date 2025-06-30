import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    currentTheme: string;
    setActiveTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState("light");

    const applyTheme = (theme: string) => {
        const html = document.documentElement;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? "dark" : "light";

        const resolvedTheme = theme === "system" ? systemTheme : theme;

        html.classList.remove("light", "dark");
        html.classList.add(resolvedTheme);
        setCurrentTheme(theme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? "dark" : "light";

        const themeToApply = storedTheme || "system";
        const resolvedTheme = themeToApply === "system" ? systemTheme : themeToApply;

        document.documentElement.classList.add(resolvedTheme);
        setCurrentTheme(themeToApply);
    }, []);

    const setActiveTheme = (theme: string) => {
        localStorage.setItem("theme", theme);
        applyTheme(theme);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setActiveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};

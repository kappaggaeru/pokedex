import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export type ThemeOption = "light" | "dark" | "retro" | "system";
type AppliedTheme = "light" | "dark" | "retro"; // lo que realmente se aplica

interface ThemeContextType {
    currentTheme: ThemeOption; // lo elegido por el usuario (puede ser "system")
    resolvedTheme: ThemeOption;
    setActiveTheme: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeOption>("system");
    const [resolvedTheme, setResolvedTheme] = useState<ThemeOption>("system");

    //TODO guardar el tema elegido en cookies

    const getSystemTheme = (): AppliedTheme => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setResolvedTheme(prefersDark ? "dark" : "light");
        return prefersDark ? "dark" : "light";
    };

    const applyTheme = useCallback((theme: ThemeOption) => {
        const html = document.documentElement;
        const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

        html.classList.remove("light", "dark", "retro");
        html.classList.add(resolvedTheme);

        setCurrentTheme(theme);

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            const hexColor =
                resolvedTheme === "light"
                    ? "#f9fafb"   // Tailwind: bg-gray-50
                    : resolvedTheme === "dark"
                        ? "#1e293b"   // Tailwind: bg-black
                        : "#242126"; // Por si tenés algún modo extra tipo retro

            themeColor.setAttribute("content", hexColor);
        }
    }, []);

    // Al iniciar la app
    useEffect(() => {
        const storedTheme = (localStorage.getItem("theme") as ThemeOption) || "system";
        applyTheme(storedTheme);
    }, [applyTheme]);

    // Escuchar cambios en el sistema si el tema actual es "system"
    useEffect(() => {
        if (currentTheme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
            const systemTheme = getSystemTheme();
            const html = document.documentElement;

            if (!html.classList.contains(systemTheme)) {
                html.classList.remove("light", "dark", "retro");
                html.classList.add(systemTheme);
                applyTheme(systemTheme);
            }
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, [currentTheme, applyTheme]);

    const setActiveTheme = (theme: ThemeOption) => {
        localStorage.setItem("theme", theme);
        applyTheme(theme);
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, resolvedTheme, setActiveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};

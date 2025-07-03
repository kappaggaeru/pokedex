"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHasMounted } from "../hooks/useHasMounted";

export type LanguageOption = "en" | "es" | "ja";

interface LanguageContextType {
    language: LanguageOption;
    setActiveLanguage: (language: LanguageOption) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const hasMounted = useHasMounted();
    const [cookies, setCookie] = useCookies(["userLanguage"]);
    const [language, setLanguage] = useState<LanguageOption>("en");
    const cookieExpiration = 60 * 60 * 24 * 30;

    useEffect(() => {
        if (hasMounted) {
            const prevLanguage = cookies.userLanguage as LanguageOption;
            if (prevLanguage) {
                setLanguage(prevLanguage)
            }
        }
    }, [hasMounted, cookies.userLanguage]);

    const setActiveLanguage = (language: LanguageOption) => {
        setCookie("userLanguage", language, { path: "/", maxAge: cookieExpiration});
        setLanguage(language);
    }

    return (
        <LanguageContext.Provider value={{ language, setActiveLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
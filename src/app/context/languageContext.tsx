import { createContext, ReactNode, useContext, useState } from "react";

export type LanguageOption = "en" | "es" | "ja";

interface LanguageContextType {
    language: LanguageOption;
    setLanguage: (language: LanguageOption) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<LanguageOption>("es");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
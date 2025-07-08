"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface AccesibilityContextType {
    enabledAnimations: boolean;
    setEnableAnimations: (enabled: boolean) => void;
    enabledSoundEffects: boolean;
    setEnableSoundEffects: (enabled: boolean) => void;
}

const AccesibilityContext = createContext<AccesibilityContextType | undefined>(undefined);

export const AccesibilityProvider = ({ children }: { children: ReactNode }) => {
    const [enabledAnimations, setAnimations] = useState(true);
    const [enabledSoundEffects, setSoundEffects] = useState(true);

    const setEnableSoundEffects = (enabled: boolean) => {
        setSoundEffects(enabled);
    }

    const setEnableAnimations = (enabled: boolean) => {
        setAnimations(enabled);
    }

    return (
        <AccesibilityContext.Provider value={{
            enabledAnimations,
            setEnableAnimations,
            enabledSoundEffects,
            setEnableSoundEffects,
        }}>
            {children}
        </AccesibilityContext.Provider>
    );
};
export const useAccesibility = () => {
    const context = useContext(AccesibilityContext);
    if (!context) throw new Error("useAccesibility must be used within AccesibilityProvider");
    return context;
}
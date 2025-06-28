import { createContext, useContext, useState, ReactNode } from "react";

type PokemonTier = "normal" | "legendary" | "mythical";

interface PokemonContextType {
    tier: PokemonTier;
    setTier: (tier: PokemonTier) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const [tier, setTier] = useState<PokemonTier>("normal");

    return (
        <PokemonContext.Provider value={{ tier, setTier }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemonTier = () => {
    const context = useContext(PokemonContext);
    if (!context) throw new Error("usePokemonTier must be used within PokemonProvider");
    return context;
};

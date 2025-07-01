import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";

type PokemonTier = "normal" | "legendary" | "mythical";

interface PokemonContextType {
    tier: PokemonTier;
    setTier: (tier: PokemonTier) => void;
    capturePokemon: (id: number) => void;
    clearCapturedList: () => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const [tier, setTier] = useState<PokemonTier>("normal");
    const [capturedIds, setCapturedIds] = useState<number[]>([]);
    const [cookies, setCookie, removeCookie] = useCookies(["capturedList"]);

    useEffect(() => {
        const raw = cookies.capturedList;
        const parsed = typeof raw === "string"
            ? raw.split(",").filter(Boolean).map(Number)
            : [];
        setCapturedIds(parsed);
    }, []);

    const capturePokemon = (id: number) => {
        if (capturedIds.includes(id)) return;

        const newList = [...capturedIds, id];
        setCapturedIds(newList); // actualiza en memoria
        setCookie("capturedList", newList.join(","), { path: "/" }); // actualiza cookie
        console.log("pokemon capturado -> ", id);
    };


    const clearCapturedList = () => {
        removeCookie("capturedList", { path: "/" });
    }

    return (
        <PokemonContext.Provider value={{ tier, setTier, capturePokemon, clearCapturedList }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if (!context) throw new Error("usePokemon must be used within PokemonProvider");
    return context;
};

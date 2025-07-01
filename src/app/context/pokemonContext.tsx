import { createContext, useContext, useState, ReactNode } from "react";
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
    const [cookies, setCookie, removeCookie] = useCookies(["capturedList"]);

    const capturePokemon = (id: number) => {
        const captureList = cookies.capturedList || "";
        const arrayList = captureList
            .split(",")
            .filter((val: string) => val !== "") // borro strings vacios
            .map(Number); // convierto a number

        if (!arrayList.includes(id)) {
            const newList = [...arrayList, id]; // toma todos los elementos y agrega el nuevo
            setCookie("capturedList", newList.join(","), { path: "/" });
        }
    }

    const clearCapturedList =  () => {
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

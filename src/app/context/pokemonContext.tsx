import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getPokemonById, getSprite } from "../services/pokemon.service";
import { Pokemon } from "../models/dto/pokemon.model";
import { scrollToTop } from "../utils/scroll";

type PokemonTier = "normal" | "legendary" | "mythical";

export type PokemonList = {
    id: number;
    name: string;
}

type ViewedState = {
    loading: boolean;
    sprite?: string;
};

interface PokemonContextType {
    tier: PokemonTier;
    selectedId: number | null;
    pokemonList: PokemonList[];
    viewedMap: Record<number, ViewedState>;
    selectedPokemon: Pokemon | null;
    isLoadingPokemon: boolean;
    setTier: (tier: PokemonTier) => void;
    capturePokemon: (id: number) => void;
    clearCapturedList: () => void;
    setPokemonList: (list: PokemonList[]) => void;
    selectPokemon: (id: number) => void;
    clearPokemonCard: () => void;
    setViewedMap: React.Dispatch<React.SetStateAction<Record<number, ViewedState>>>;
    setIsLoadingPokemon: React.Dispatch<React.SetStateAction<boolean>>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const [tier, setTier] = useState<PokemonTier>("normal"); // tipo de pokemon seleccionado: normal, legendatio o mitico
    const [capturedIds, setCapturedIds] = useState<number[]>([]); // arreglo de ids usado para actualizar las cookies
    const [pokemonList, setPokemonList] = useState<{ id: number, name: string }[]>([]); // listado completo de todos los pokemon
    const [capturedList, setCapturedList] = useState<number[]>([]);
    const [viewedMap, setViewedMap] = useState<Record<number, { loading: boolean; sprite?: string }>>({}); // mapa control de sprites
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["capturedList"]);

    const cookieExpiration = 60 * 60 * 24 * 30;

    useEffect(() => {
        const raw = cookies.capturedList;
        const parsed = typeof raw === "string"
            ? raw.split(",").filter(Boolean).map(Number)
            : [];
        setCapturedIds(parsed);
    }, [cookies.capturedList]);

    const selectPokemon = async (id: number) => {
        if (!id || typeof id !== "number") return;
        if (selectedId === id) return;

        scrollToTop();
        setSelectedId(id);
        setIsLoadingPokemon(true);
        capturePokemon(id);

        try {
            const [pokemon, spriteBlob] = await Promise.all([
                getPokemonById(id),
                getSprite(id),
            ]);

            const objectURL = URL.createObjectURL(spriteBlob);
            setViewedMap((prev) => ({
                ...prev,
                [id]: { loading: false, sprite: objectURL },
            }));
            setSelectedPokemon(pokemon);

            if (!capturedList.includes(pokemon.id)) {
                setCapturedList(prev => [...prev, pokemon.id]);
            }
        } catch (error) {
            console.error("Error selecting Pokémon", error);
            setViewedMap((prev) => ({
                ...prev,
                [id]: { loading: false },
            }));
        } finally {
            setIsLoadingPokemon(false);
        }
    };

    const clearPokemonCard = () => {
        setSelectedId(null);
        setSelectedPokemon(null);
        setIsLoadingPokemon(false);
    }

    const capturePokemon = (id: number) => {
        if (capturedIds.includes(id)) return;

        const newList = [...capturedIds, id];
        setCapturedIds(newList); // actualiza en memoria
        setCookie("capturedList", newList.join(","), { path: "/", maxAge: cookieExpiration }); // actualiza cookie
    };

    const clearCapturedList = () => {
        removeCookie("capturedList", { path: "/" });
    }

    return (
        <PokemonContext.Provider value={{
            selectedId,
            pokemonList,
            tier,
            viewedMap,
            selectedPokemon,
            isLoadingPokemon,
            setTier,
            capturePokemon,
            clearCapturedList,
            setPokemonList,
            selectPokemon,
            clearPokemonCard,
            setViewedMap,
            setIsLoadingPokemon
        }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if (!context) throw new Error("usePokemon must be used within PokemonProvider");
    return context;
};

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getPokemonById, getSprite } from "../services/pokemon.service";
import { Pokemon } from "../models/dto/pokemon.model";
import { scrollToTop } from "../utils/scroll";
import { useAchievements } from "./achievementsContext";

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
    shouldBlinkArtwork: boolean;
    capturedList: number[];
    setTier: (tier: PokemonTier) => void;
    capturePokemon: (id: number) => void;
    clearCapturedList: () => void;
    setPokemonList: (list: PokemonList[]) => void;
    selectPokemon: (id: number) => void;
    clearPokemonCard: () => void;
    setViewedMap: React.Dispatch<React.SetStateAction<Record<number, ViewedState>>>;
    setIsLoadingPokemon: React.Dispatch<React.SetStateAction<boolean>>;
    setShouldBlinkArtwork: (value: boolean) => void;
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
    const [shouldBlinkArtwork, setShouldBlinkArtwork] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["capturedList"]);
    const { updateCountAchievements } = useAchievements();


    const MIN_ID = 1;
    const MAX_ID = 1025;
    const cookieExpiration = 60 * 60 * 24 * 30;

    useEffect(() => {
        const raw = cookies.capturedList;
        const parsed = typeof raw === "string"
            ? raw.split(",").filter(Boolean).map(Number)
            : [];
        setCapturedIds(parsed);
    }, [cookies.capturedList]);


    // Actualiza la función selectPokemon:
    const selectPokemon = async (id: number) => {
        if (!id || typeof id !== "number") return;
        if (selectedId === id) return;

        scrollToTop();
        setSelectedId(id);
        setIsLoadingPokemon(true);

        try {
            const [pokemon, spriteBlob] = await Promise.all([
                getPokemonById(id),
                getSprite(id),
            ]);

            const objectURL = URL.createObjectURL(spriteBlob);

            // Actualizar viewedMap inmediatamente
            setViewedMap((prev) => ({
                ...prev,
                [id]: { loading: false, sprite: objectURL },
            }));

            setSelectedPokemon(pokemon);

            // Actualizar la lista de capturados solo si no está ya incluido
            let newCapturedList = capturedList;
            if (!capturedList.includes(pokemon.id) && pokemon.id <= 1025) {
                newCapturedList = [...capturedList, pokemon.id];
                setCapturedList(newCapturedList);

                // Actualizar cookies de forma segura
                const cookieValue = newCapturedList.join(',');
                setCookie('capturedList', cookieValue, {
                    maxAge: 60 * 60 * 24 * 365, // 1 año
                    path: '/',
                    sameSite: 'strict'
                });

                // Actualizar achievements con la nueva lista y el tier del pokémon
                updateCountAchievements(newCapturedList);
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

    // También agrega un useEffect para sincronizar achievements cuando se inicializa desde cookies
    useEffect(() => {
        if (capturedList.length > 0) {
            updateCountAchievements(capturedList);
        }
    }, [capturedList.length]); // Solo cuando cambia la longitud, no en cada cambio

    // También necesitarás una función para inicializar el estado desde cookies
    const initializeCapturedListFromCookies = () => {
        const cookieValue = cookies.capturedList;
        if (typeof cookieValue === "string" && cookieValue) {
            const ids = cookieValue
                .split(",")
                .filter((v) => v !== "")
                .map(Number)
                .filter((id) => !isNaN(id));
            setCapturedList(ids);
        }
    };

    // Llama esta función en tu useEffect de inicialización del contexto
    useEffect(() => {
        initializeCapturedListFromCookies();
    }, [cookies.capturedList]);

    // Nuevo useEffect para forzar re-render cuando cambie capturedList
    useEffect(() => {
        // Este useEffect se ejecuta cuando cambia capturedList
        // Ayuda a que los componentes hijos se actualicen correctamente
        console.log('CapturedList updated:', capturedList);
    }, [capturedList]);

    const clearPokemonCard = () => {
        setSelectedId(null);
        setSelectedPokemon(null);
        setIsLoadingPokemon(false);
    }

    const capturePokemon = (id: number) => {
        if (id < MIN_ID || id > MAX_ID) return;
        if (capturedIds.includes(id)) return;

        const newList = [...capturedIds, id];
        setCapturedIds(newList); // actualiza en memoria
        setCookie("capturedList", newList.join(","), { path: "/", maxAge: cookieExpiration }); // actualiza cookie
        updateCountAchievements(capturedList);
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
            shouldBlinkArtwork,
            capturedList,
            setTier,
            capturePokemon,
            clearCapturedList,
            setPokemonList,
            selectPokemon,
            clearPokemonCard,
            setViewedMap,
            setIsLoadingPokemon,
            setShouldBlinkArtwork
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

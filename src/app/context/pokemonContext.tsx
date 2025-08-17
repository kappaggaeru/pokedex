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
    error?: boolean;
};

interface PokemonContextType {
    tier: PokemonTier;
    selectedId: number | null;
    capturedIds: number[];
    pokemonList: PokemonList[];
    viewedMap: Record<number, ViewedState>;
    selectedPokemon: Pokemon | null;
    isLoadingPokemon: boolean;
    capturedList: number[];
    ashCapturedList: number[];
    ashCaptureCount: number;
    generations: { name: string, count: number, roman: string }[];
    filteredRegions: string[];
    setTier: (tier: PokemonTier) => void;
    clearCapturedList: () => void;
    setPokemonList: (list: PokemonList[]) => void;
    selectPokemon: (id: number) => void;
    clearPokemonCard: () => void;
    setViewedMap: React.Dispatch<React.SetStateAction<Record<number, ViewedState>>>;
    setIsLoadingPokemon: React.Dispatch<React.SetStateAction<boolean>>;
    toggleFilteredRegion: (region: string) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const [tier, setTier] = useState<PokemonTier>("normal"); // tipo de pokemon seleccionado: normal, legendatio o mitico
    const [capturedIds, setCapturedIds] = useState<number[]>([]); // arreglo de ids usado para actualizar las cookies
    const [pokemonList, setPokemonList] = useState<{ id: number, name: string }[]>([]); // listado completo de todos los pokemon
    const [capturedList, setCapturedList] = useState<number[]>([]);
    const [ashCapturedList, setAshCapturedList] = useState<number[]>([]);
    const [ashCaptureCount, setAshCaptureCount] = useState(0);
    const [viewedMap, setViewedMap] = useState<Record<number, { loading: boolean; sprite?: string; error?: boolean }>>({}); // mapa control de sprites
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["capturedList"]);
    const { updateCountAchievements, checkCaptureCountAshAchievement } = useAchievements();
    const [filteredRegions, setFilteredRegions] = useState([
        "Kanto",
        "Johto",
        "Hoenn",
        "Sinnoh",
        "Unova",
        "Kalos",
        "Alola",
        "Galar",
        "Paldea"
    ]);

    const generations = [
        { name: "Kanto", count: 151, roman: "I" },
        { name: "Johto", count: 100, roman: "II" },
        { name: "Hoenn", count: 135, roman: "III" },
        { name: "Sinnoh", count: 107, roman: "IV" },
        { name: "Unova", count: 156, roman: "V" },
        { name: "Kalos", count: 72, roman: "VI" },
        { name: "Alola", count: 88, roman: "VII" },
        { name: "Galar", count: 96, roman: "VIII" },
        { name: "Paldea", count: 120, roman: "IX" },
    ];


    const ashGoalCaptureList: number[] = [25, 18, 1, 6, 99, 89, 128, 143, 214, 153,
        156, 158, 164, 232, 277, 254, 341, 324, 362, 398,
        389, 392, 418, 472, 443, 521, 501, 499, 495, 559,
        542, 536, 525, 553, 663, 701, 715, 149, 94, 448,
        865, 882, 722, 745, 727, 809, 122, 7, 57, 706,
        658, 804, 12, 131, 246, 791, 20, 190, 15
    ];
    const MAX_ID = 1025;
    const cookieExpiration = 60 * 60 * 24 * 365; // 1 año

    // Paso 1: leer la cookie y setear capturedIds
    useEffect(() => {
        const raw = cookies.capturedList;
        const parsed = typeof raw === "string"
            ? raw.split(",").filter(Boolean).map(Number)
            : [];
        setCapturedIds(parsed);
    }, [cookies.capturedList]);

    // Paso 2: una vez que capturedIds cambia, calcular los Ash Pokémon
    useEffect(() => {
        const ashIds: number[] = [];

        for (const id of capturedIds) {
            if (isAshPokemon(id)) {
                ashIds.push(id);
                if (ashIds.length === ashGoalCaptureList.length) break;
            }
        }

        setAshCapturedList(ashIds);
        setAshCaptureCount(ashIds.length);
        checkCaptureCountAshAchievement(ashIds.length);
    }, [capturedIds]);



    // funcion para seleccionar y capturar pokemon
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
                [id]: { loading: false, sprite: objectURL, error: false },
            }));

            setSelectedPokemon(pokemon);

            // Actualizar la lista de capturados solo si no está ya incluido y no es una variante
            let newCapturedList = capturedList;
            if (!capturedList.includes(pokemon.id) && pokemon.id <= MAX_ID) {
                newCapturedList = [...capturedList, pokemon.id];
                setCapturedList(newCapturedList);

                const cookieValue = newCapturedList.join(',');
                setCookie('capturedList', cookieValue, {
                    maxAge: cookieExpiration,
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
                [id]: { loading: false, error: false },
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

    const clearCapturedList = () => {
        removeCookie("capturedList", { path: "/" });
    }

    const isAshPokemon = (id: number): boolean => {
        return ashGoalCaptureList.includes(id);
    }

    const toggleFilteredRegion = (region: string) => {
        if (!filteredRegions.includes(region)) {
            setFilteredRegions([...filteredRegions, region]);
        } else {
            setFilteredRegions(filteredRegions.filter(r => r !== region));
        }
    }

    return (
        <PokemonContext.Provider value={{
            selectedId,
            capturedIds,
            pokemonList,
            tier,
            viewedMap,
            selectedPokemon,
            isLoadingPokemon,
            capturedList,
            ashCapturedList,
            ashCaptureCount,
            generations,
            filteredRegions,
            setTier,
            clearCapturedList,
            setPokemonList,
            selectPokemon,
            clearPokemonCard,
            setViewedMap,
            setIsLoadingPokemon,
            toggleFilteredRegion
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

import { createContext, ReactNode, useContext, useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { AchievementProps } from "../models/props/achievement.props";
import { ArrowBigUp, Gamepad, Gem, Sparkles, Volume2Icon } from "lucide-react";
import { playSound } from "react-sounds";
import { useAccesibility } from "./accesibilityContext";

interface CompletedAchievement {
    id: number;
    completedAt: string;
}

interface AchievementContextType {
    achievements: AchievementProps[];
    notifications: AchievementProps[];
    capturedCount: number;
    capturedAshCount: number;
    shownAchievements: Set<number>;
    setAchievement: (index: number) => void;
    setSpecialAchievement: (index: number) => void;
    updateCountAchievements: (capturedList: number[]) => void;
    updateAshCountAchievement: (ashCapturedList: number[]) => void;
    checkTierAchievement: (id: number, pokemonTier: string) => void;
    showNotification: (id: number) => void;
    getAchievement: (id: number) => AchievementProps | null;
    removeNotification: (id: number) => void;
    clearAchievements: () => void;
}

// Definir los tipos de cookies específicamente
type CookieNames =
    | 'completedAchievements'
    | 'firstLegendary'
    | 'firstMythical'
    | 'firstRoar'
    | 'firstShiny'
    | 'firstEvolution'
    | 'firstVariant'
    | 'retroMode'
    | 'ashCapturedList';

type CookieValues = {
    completedAchievements?: CompletedAchievement[];
    firstLegendary?: string;
    firstMythical?: string;
    firstRoar?: string;
    firstShiny?: string;
    firstEvolution?: string;
    firstVariant?: string;
    retroMode?: string;
    ashCapturedList?: string;
};

const AchievementsContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
    const cookieNames: CookieNames[] = [
        'completedAchievements',
        'firstLegendary',
        'firstMythical',
        'firstRoar',
        'firstShiny',
        'firstEvolution',
        'firstVariant',
        'retroMode',
        'ashCapturedList'
    ];

    const [cookies, setCookie, removeCookie] = useCookies(cookieNames);
    // Ref para trackear qué achievements ya fueron notificados en esta sesión
    const notifiedAchievements = useRef(new Set<number>());
    const [shownAchievements, setShownAchievements] = useState<Set<number>>(new Set());
    const [notifications, setNotifications] = useState<AchievementProps[]>([]);
    const [capturedCount, setCapturedCount] = useState(0);
    const [capturedAshCount, setCapturedAshCount] = useState(0);
    const completedSound = "/assets/sounds/completed.mp3";
    const { enabledSoundEffects } = useAccesibility();

    const ASH_ACHIEVEMENT_ID = 12;
    const LEGENDARY_ACHIEVEMENT_ID = 7;
    const MYTHICAL_ACHIEVEMENT_ID = 8;

    const [achievements, setAchievements] = useState<AchievementProps[]>([
        {
            id: 0,
            title: "Caught First Pokémon",
            description: "You caught your first Pokémon.",
            goal: 1,
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
            type: "capture_count",
            completed: false,
        },
        {
            id: 1,
            title: "Caught 10 Pokémon",
            description: "You caught 10 Pokémon.",
            goal: 10,
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png",
            type: "capture_count",
            completed: false
        },
        {
            id: 2,
            title: "Caught 25 Pokémon",
            description: "You caught 25 Pokémon.",
            goal: 25,
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
            type: "capture_count",
            completed: false
        },
        {
            id: 3,
            title: "Caught 50 Pokémon",
            description: "You caught 50 Pokémon.",
            goal: 50,
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
            type: "capture_count",
            completed: false
        },
        {
            id: 4,
            title: "Caught 100 Pokémon",
            description: "You caught 100 Pokémon.",
            goal: 100,
            type: "capture_count",
            completed: false
        },
        {
            id: 5,
            title: "Caught 500 Pokémon",
            description: "You caught 500 Pokémon.",
            goal: 500,
            type: "capture_count",
            completed: false
        },
        {
            id: 6,
            title: "Gotta Catch 'Em All!",
            description: "You caught all available Pokémon.",
            goal: 1025,
            type: "capture_count",
            completed: false
        },
        {
            id: 7,
            title: "Caught a Legendary Pokémon",
            description: "You caught your first Legendary Pokémon.",
            goal: 1,
            type: "first_legendary",
            hasCookie: "firstLegendary",
            completed: false
        },
        {
            id: 8,
            title: "Caught a Mythical Pokémon",
            description: "You caught your first Mythical Pokémon.",
            goal: 1,
            type: "first_mythical",
            hasCookie: "firstMythical",
            completed: false
        },
        {
            id: 9,
            title: "I choose you!",
            description: "You discovered a Pokémon's roar.",
            goal: 1,
            icon: Volume2Icon,
            type: "special",
            hasCookie: "firstRoar",
            completed: false
        },
        {
            id: 10,
            title: "Make it Shine!",
            description: "You discovered a shiny Pokémon.",
            goal: 1,
            icon: Sparkles,
            type: "special",
            hasCookie: "firstShiny",
            completed: false
        },
        {
            id: 11,
            title: "Evolution Complete",
            description: "You evolved a Pokémon for the first time.",
            goal: 1,
            icon: ArrowBigUp,
            type: "special",
            hasCookie: "firstEvolution",
            completed: false
        },
        {
            id: 12,
            title: "Ketchum",
            description: "You caught all of Ash's Pokémon.",
            goal: 59,
            image: "https://dcdn-us.mitiendanube.com/stores/003/493/448/products/ash-ketchum-pokemon-mascara-7b5badc9a99edc65f117161467636640-640-0.png",
            type: "capture_specific",
            completed: false
        },
        {
            id: 13,
            title: "Found a Variant",
            description: "You discovered a Pokémon variant.",
            goal: 1,
            icon: Gem,
            type: "special",
            hasCookie: "firstVariant",
            completed: false
        },
        {
            id: 14,
            title: "Retro Mode Unlocked",
            description: "You unlocked Retro Mode.",
            goal: 1,
            icon: Gamepad,
            type: "special",
            hasCookie: "retroMode",
            completed: false
        }
    ]);

    const clearAchievements = () => {
        // Limpiar todas las cookies relacionadas con logros
        cookieNames.forEach(cookieName => {
            removeCookie(cookieName, { path: "/" });
        });

        document.cookie.split(";").forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = cookie.substring(0, eqPos).trim();
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });


        // Resetear el estado de achievements
        setAchievements(prev =>
            prev.map(achievement => ({
                ...achievement,
                completed: false
            }))
        );

        // Limpiar notificaciones
        setNotifications([]);

        // Resetear contador
        setCapturedCount(0);
        setCapturedAshCount(0);

        // Limpiar el tracking de notificaciones
        notifiedAchievements.current.clear();
        setShownAchievements(new Set());
        removeCookie('completedAchievements', { path: "/" });
    };

    // Función helper para verificar cookies de forma segura
    const getCookieValue = (cookieName: string): boolean => {
        const cookieValue = (cookies as CookieValues)[cookieName as keyof CookieValues];
        return Boolean(cookieValue);
    };

    // Inicializar achievements desde cookies
    useEffect(() => {
        const completedAchievements: CompletedAchievement[] = cookies.completedAchievements || [];

        setAchievements(prev =>
            prev.map(achievement => {
                // Para achievements especiales, verificar también sus cookies específicas
                if (achievement.hasCookie) {
                    const hasCookie = getCookieValue(achievement.hasCookie);
                    const foundCompleted = completedAchievements.find(completed => completed.id === achievement.id);
                    const isCompleted = hasCookie || !!foundCompleted;

                    if (isCompleted) {
                        notifiedAchievements.current.add(achievement.id);
                        shownAchievements.add(achievement.id);
                    }

                    let completedAt: Date | null | undefined = achievement.completedAt;
                    if (foundCompleted?.completedAt) {
                        completedAt = new Date(foundCompleted.completedAt);
                    }

                    return {
                        ...achievement,
                        completed: isCompleted,
                        completedAt: completedAt ?? null
                    };
                }

                const foundCompleted = completedAchievements.find(completed => completed.id === achievement.id);
                const isCompleted = !!foundCompleted;

                if (isCompleted) {
                    notifiedAchievements.current.add(achievement.id);
                    shownAchievements.add(achievement.id);
                }

                let completedAt: Date | null | undefined = achievement.completedAt;
                if (foundCompleted?.completedAt) {
                    completedAt = new Date(foundCompleted.completedAt);
                }

                return {
                    ...achievement,
                    completed: isCompleted,
                    completedAt: completedAt ?? null
                };
            })
        );
    }, [cookies]);

    const setAchievement = (id: number) => {
        // Verificar si el logro ya está completado
        const achievement = achievements.find(a => a.id === id);
        if (!achievement || achievement.completed) {
            return;
        }

        // marca como completo
        completeAchievement(id);
        updateCompletedAchievement(id);
    };

    const updateCompletedAchievement = (id: number) => {
        const completedAchievements: CompletedAchievement[] = cookies.completedAchievements || [];
        const newCompleted = {
            id,
            completedAt: new Date().toISOString()
        };
        if (!completedAchievements.some(completed => completed.id === id)) {
            setCookie('completedAchievements', [...completedAchievements, newCompleted], {
                maxAge: 60 * 60 * 24 * 365, // 1 año
                path: '/',
                sameSite: 'strict'
            });
        }
    }

    /**
     * verifica los achievements que dependen de comportamiento particular
     */
    const setSpecialAchievement = (id: number) => {
        const achievement = getAchievement(id);
        if (achievement) {
            if (!achievement.completed &&
                !notifiedAchievements.current.has(achievement.id)
            ) {
                completeAndNotify(id);
            }
        }
    }

    /**
     * setea la cookie para el achievement determinado
     */
    const setCookieAchievement = (id: number) => {
        const achievement = getAchievement(id);
        if (achievement) {
            const achievementCookie = achievement.hasCookie;
            setCookie(achievementCookie as CookieNames, 'true', {
                maxAge: 60 * 60 * 24 * 365,
                path: '/',
                sameSite: 'strict'
            });
        }
    }

    /**
     * verifica los achivements que depende del contador de capturas
     */
    const updateCountAchievements = (capturedList: number[]) => {
        const newCapturedCount = capturedList.length;
        const previousCount = capturedCount;

        // actualizo capturedCount
        setCapturedCount(newCapturedCount);

        if (newCapturedCount > previousCount) {
            checkCaptureCountAchievements(newCapturedCount);
        }
    }

    /**
     * verifica el achievement que depende del contador de capturas de ash
     */
    const updateAshCountAchievement = (ashCapturedList: number[]) => {
        const newCapturedCount = ashCapturedList.length;
        const previousCount = capturedCount;

        // actualizo capturedCount
        setCapturedAshCount(newCapturedCount);

        if (newCapturedCount > previousCount) {
            checkCaptureCountAshAchievement(newCapturedCount);
        }
    }

    /**
     * valida si los achievemts de captura fueron completados
     */
    const checkCaptureCountAchievements = (count: number) => {
        achievements.forEach(achievement => {
            if (
                achievement.type === "capture_count" &&
                !achievement.completed &&
                !notifiedAchievements.current.has(achievement.id) &&
                count >= achievement.goal
            ) {
                completeAndNotify(achievement.id);
            }
        });
    };

    /**
     * valida si la lista de pokemon de ash fue completada
     */
    const checkCaptureCountAshAchievement = (count: number) => {
        const ashAchievement = getAchievement(ASH_ACHIEVEMENT_ID);
        if (ashAchievement &&
            !ashAchievement.completed &&
            !notifiedAchievements.current.has(ashAchievement.id) &&
            count >= ashAchievement.goal) {
            completeAndNotify(ashAchievement.id);
        }
    }

    /**
     *  valida los achievements de tier
     */
    const checkTierAchievement = (id: number, pokemonTier: string) => {
        if (pokemonTier === "legendary" &&
            !getCookieValue("firstLegendary") &&
            !notifiedAchievements.current.has(LEGENDARY_ACHIEVEMENT_ID)) {
            setSpriteLegendaryOrMythical(id, LEGENDARY_ACHIEVEMENT_ID);
            completeAndNotify(7);
        }

        if (pokemonTier === "mythical" &&
            !getCookieValue("firstMythical") &&
            !notifiedAchievements.current.has(MYTHICAL_ACHIEVEMENT_ID)) {
            setSpriteLegendaryOrMythical(id, MYTHICAL_ACHIEVEMENT_ID);
            completeAndNotify(8);
        }
    };

    /**
     * setea el id del pokemon legendario o mitico capturado
     * @param idCapture
     * @param idAchievement
     */
    const setSpriteLegendaryOrMythical = (idCapture: number, idAchievement: number) => {
        setAchievements(prev =>
            prev.map(achievement =>
                achievement.id === idAchievement
                    ? { ...achievement, idCapture: idCapture }
                    : achievement
            )
        );
    }

    /**
     * marca el achievement como completado
     */
    const completeAchievement = (id: number) => {
        const completedAt = new Date();
        setAchievements(prev =>
            prev.map(achievement =>
                achievement.id === id
                    ? { ...achievement, completed: true, completedAt: completedAt }
                    : achievement
            )
        );
    }

    /**
     * engloba el comportamiento de completar un achievement
     */
    const completeAndNotify = (id: number) => {
        setCookieAchievement(id);
        setAchievement(id);
        showNotification(id);
    };

    const showNotification = (id: number) => {
        if (notifiedAchievements.current.has(id)) return;

        const achievement = getAchievement(id);
        if (!achievement) return;

        // Marcar como notificado (inmediatamente, para evitar que vuelva a entrar)
        notifiedAchievements.current.add(id);
        shownAchievements.add(id);

        // Agregar un delay de 1.5 segundos antes de mostrar
        setTimeout(() => {
            if (enabledSoundEffects) {
                playSound(completedSound);
            }

            setNotifications(prev => {
                // Evitar duplicados
                if (!prev.some(notif => notif.id === id)) {
                    return [...prev, achievement];
                }
                return prev;
            });
        }, 1500); // 1500ms = 1.5 segundos
    };

    const removeNotification = (id: number) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const getAchievement = (id: number): AchievementProps | null => {
        return achievements.find(achievement => achievement.id === id) || null;
    };

    return (
        <AchievementsContext.Provider value={{
            achievements,
            notifications,
            capturedCount,
            capturedAshCount,
            shownAchievements,
            setAchievement,
            setSpecialAchievement,
            updateCountAchievements,
            updateAshCountAchievement,
            checkTierAchievement,
            showNotification,
            getAchievement,
            removeNotification,
            clearAchievements
        }}>
            {children}
        </AchievementsContext.Provider>
    );
};

export const useAchievements = () => {
    const context = useContext(AchievementsContext);
    if (!context) throw new Error("useAchievement must be used within AchievementProvider");
    return context;
};
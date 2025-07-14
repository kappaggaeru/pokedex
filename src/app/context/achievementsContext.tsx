import { createContext, ReactNode, useContext, useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { AchievementProps } from "../models/props/achievement.props";

interface CompletedAchievement {
    id: number;
    completedAt: string;
}

interface AchievementContextType {
    achievements: AchievementProps[];
    notifications: AchievementProps[];
    capturedCount: number;
    setAchievement: (index: number) => void;
    checkAchievements: () => void;
    updateAchievements: (capturedList: number[]) => void;
    checkTierAchievement: (pokemonTier: string) => void;
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
    | 'firstChainComplete'
    | 'retroMode';

type CookieValues = {
    completedAchievements?: CompletedAchievement[];
    firstLegendary?: string;
    firstMythical?: string;
    firstRoar?: string;
    firstShiny?: string;
    firstEvolution?: string;
    firstVariant?: string;
    firstChainComplete?: string;
    retroMode?: string;
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
        'firstChainComplete',
        'retroMode'
    ];

    const [cookies, setCookie, removeCookie] = useCookies(cookieNames);

    // Ref para trackear qué achievements ya fueron notificados en esta sesión
    const notifiedAchievements = useRef(new Set<number>());

    const [achievements, setAchievements] = useState<AchievementProps[]>([
        {
            id: 0,
            title: "Caught First Pokémon",
            description: "You caught your first Pokémon.",
            goal: 1,
            type: "capture_count",
            completed: false,
        },
        {
            id: 1,
            title: "Caught 2 Pokémon",
            description: "You caught 10 Pokémon.",
            goal: 2,
            type: "capture_count",
            completed: false
        },
        {
            id: 2,
            title: "Caught 3 Pokémon",
            description: "You caught 25 Pokémon.",
            goal: 3,
            type: "capture_count",
            completed: false
        },
        {
            id: 3,
            title: "Caught 4 Pokémon",
            description: "You caught 50 Pokémon.",
            goal: 4,
            type: "capture_count",
            completed: false
        },
        {
            id: 4,
            title: "Caught 5 Pokémon",
            description: "You caught 100 Pokémon.",
            goal: 5,
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
            type: "special",
            hasCookie: "firstRoar",
            completed: false
        },
        {
            id: 10,
            title: "Make it Shine!",
            description: "You discovered a shiny Pokémon.",
            goal: 1,
            type: "special",
            hasCookie: "firstShiny",
            completed: false
        },
        {
            id: 11,
            title: "Evolution Complete",
            description: "You evolved a Pokémon for the first time.",
            goal: 1,
            type: "special",
            hasCookie: "firstEvolution",
            completed: false
        },
        {
            id: 12,
            title: "Ketchup",
            description: "You caught all of Ash's Pokémon.",
            goal: 50,
            type: "capture_specific",
            captureList: [25, 18, 1, 6, 99, 89, 128, 143, 214, 153,
                156, 158, 164, 232, 277, 254, 341, 324, 362, 398,
                389, 392, 418, 472, 443, 521, 501, 499, 495, 559,
                542, 536, 525, 553, 663, 701, 715, 149, 94, 448,
                865, 882, 722, 745, 727, 809, 122, 7, 57, 706,
                658, 804, 12, 131, 246, 791, 20, 190, 15
            ],
            completed: false
        },
        {
            id: 13,
            title: "Found a Variant",
            description: "You discovered a Pokémon variant.",
            goal: 1,
            type: "special",
            hasCookie: "firstVariant",
            completed: false
        },
        {
            id: 14,
            title: "Evolution Chain Master",
            description: "You completed an entire evolution chain.",
            goal: 1,
            type: "special",
            hasCookie: "firstChainComplete",
            completed: false
        },
        {
            id: 15,
            title: "Retro Mode Unlocked",
            description: "You unlocked Retro Mode.",
            goal: 1,
            type: "special",
            hasCookie: "retroMode",
            completed: false
        }
    ]);

    const [notifications, setNotifications] = useState<AchievementProps[]>([]);
    const [capturedCount, setCapturedCount] = useState(0);

    // Obtener achievements de tipo captura por cantidad
    const getCaptureCountAchievements = () => {
        return achievements.filter(achievement => achievement.type === "capture_count");
    };

    const clearAchievements = () => {
        // Limpiar todas las cookies relacionadas con logros
        cookieNames.forEach(cookieName => {
            removeCookie(cookieName, { path: "/" });
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

        // Limpiar el tracking de notificaciones
        notifiedAchievements.current.clear();
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
                    const isInCompleted = completedAchievements.some(completed => completed.id === achievement.id);
                    const isCompleted = hasCookie || isInCompleted;

                    // Si ya está completado, agregarlo al tracking para evitar notificaciones
                    if (isCompleted) {
                        notifiedAchievements.current.add(achievement.id);
                    }

                    return {
                        ...achievement,
                        completed: isCompleted
                    };
                }

                const isCompleted = completedAchievements.some(completed => completed.id === achievement.id);

                // Si ya está completado, agregarlo al tracking para evitar notificaciones
                if (isCompleted) {
                    notifiedAchievements.current.add(achievement.id);
                }

                return {
                    ...achievement,
                    completed: isCompleted
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

        setAchievements(prev =>
            prev.map(achievement =>
                achievement.id === id
                    ? { ...achievement, completed: true }
                    : achievement
            )
        );

        // Actualizar cookies
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
    };

    /**
     * Verifica todos los trofeos según el tipo
     */
    const checkAchievements = () => {
        achievements.forEach((achievement) => {
            if (!achievement.completed) {
                switch (achievement.type) {
                    case "capture_count":
                        if (capturedCount >= achievement.goal) {
                            setAchievement(achievement.id);
                            showNotification(achievement.id);
                        }
                        break;
                    // Otros tipos se manejan en updateAchievements
                }
            }
        });
    };

    const updateAchievements = (capturedList: number[]) => {
        const newCapturedCount = capturedList.length;
        const previousCount = capturedCount;

        setCapturedCount(newCapturedCount);

        // Solo procesar si hay un nuevo pokémon capturado
        if (newCapturedCount > previousCount) {
            // Verificar achievements de conteo usando el estado actual
            achievements.forEach(achievement => {
                if (achievement.type === "capture_count" &&
                    !achievement.completed &&
                    !notifiedAchievements.current.has(achievement.id) &&
                    newCapturedCount >= achievement.goal) {
                    console.log(`Achievement ${achievement.id} completed: ${achievement.title}`);
                    setAchievement(achievement.id);
                    showNotification(achievement.id);
                }
            });

            // Verificar achievement de Ash's Pokémon
            const ashAchievement = achievements.find(a => a.id === 12);
            if (ashAchievement &&
                !ashAchievement.completed &&
                !notifiedAchievements.current.has(ashAchievement.id) &&
                ashAchievement.captureList) {
                const ashCaptured = capturedList.filter(id =>
                    ashAchievement.captureList!.includes(id)
                );
                if (ashCaptured.length >= ashAchievement.goal) {
                    console.log(`Ash achievement completed`);
                    setAchievement(ashAchievement.id);
                    showNotification(ashAchievement.id);
                }
            }
        }
    };

    // Función específica para manejar achievements de tier
    const checkTierAchievement = (pokemonTier: string) => {
        if (pokemonTier === "legendary" &&
            !getCookieValue("firstLegendary") &&
            !notifiedAchievements.current.has(7)) {
            setCookie('firstLegendary', 'true', {
                maxAge: 60 * 60 * 24 * 365,
                path: '/',
                sameSite: 'strict'
            });
            setAchievement(7); // Legendary achievement
            showNotification(7);
        }

        if (pokemonTier === "mythical" &&
            !getCookieValue("firstMythical") &&
            !notifiedAchievements.current.has(8)) {
            setCookie('firstMythical', 'true', {
                maxAge: 60 * 60 * 24 * 365,
                path: '/',
                sameSite: 'strict'
            });
            setAchievement(8); // Mythical achievement
            showNotification(8);
        }
    };

    const showNotification = (id: number) => {
        // Verificar si ya se notificó en esta sesión
        if (notifiedAchievements.current.has(id)) {
            return;
        }

        console.log('Showing notification for achievement:', id);
        const achievement = getAchievement(id);
        if (achievement) {
            // Marcar como notificado
            notifiedAchievements.current.add(id);

            setNotifications(prev => {
                // Evitar duplicados
                if (!prev.some(notif => notif.id === id)) {
                    return [...prev, achievement];
                }
                return prev;
            });
        }
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
            setAchievement,
            checkAchievements,
            updateAchievements,
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
/**
 * Definir listado de achievements
 * controlar el total de ganados y restantes
 * cuando se monta preguntar si existe una cookie con achievements:
 * 1) si no existe la cookie por lo tanto es la primera visita, cargar las subscripciones
 * 2) si existe y no está completa cargar suscripciones
 * 3) si está toda completa solamente marcarlos como obtenidos
 * 
 * ejemplo de achievement ash
 * tener un arreglo de los pokemon de ash, preguntar en cada captura si el id está contenido
 * en el arreglo de ash, si está actualizar el arreglo de ash, tener un arreglo local no apuntar directamente a la cookie
 * esta solo debe ser actualizada pero no usada como referencia
 * 
 */

import { createContext, ReactNode, useContext, useState } from "react";
import { AchievementProps } from "../models/props/achievement.props";

interface AchievementContextType {
    achievements: AchievementProps[];
    notifications: AchievementProps[];
    setAchievement: (index: number) => void;
    checkAchievements: () => void;
    updateAchievements: (id: number) => void;
    showNotification: (id: number) => void;
    getAchievement: (id: number) => AchievementProps | null;
    removeNotification: (id: number) => void;
}

const AchievementsContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementsProvider = ({ children }: { children: ReactNode }) => {
    const [achievements] = useState<AchievementProps[]>([
        {
            title: "Caught First Pokémon",
            description: "You caught your first Pokémon.",
            goal: 1,
            completed: false,
        },
        {
            title: "Caught 10 Pokémon",
            description: "You caught 10 Pokémon.",
            goal: 10,
            completed: false
        },
        {
            title: "Caught 25 Pokémon",
            description: "You caught 25 Pokémon.",
            goal: 25,
            completed: false
        },
        {
            title: "Caught 50 Pokémon",
            description: "You caught 50 Pokémon.",
            goal: 50,
            completed: false
        },
        {
            title: "Caught 100 Pokémon",
            description: "You caught 100 Pokémon.",
            goal: 100,
            completed: false
        },
        {
            title: "Caught 500 Pokémon",
            description: "You caught 500 Pokémon.",
            goal: 500,
            completed: false
        },
        {
            title: "Gotta Catch 'Em All!",
            description: "You caught all available Pokémon.",
            goal: 1025,
            completed: false
        },
        {
            title: "Caught a Legendary Pokémon",
            description: "You caught your first Legendary Pokémon.",
            goal: 1,
            completed: false
        },
        {
            title: "Caught a Mythical Pokémon",
            description: "You caught your first Mythical Pokémon.",
            goal: 1,
            completed: false
        },
        {
            title: "I choose you!",
            description: "You discovered a Pokémon's roar.",
            goal: 1,
            hasCookie: "", //cookie con grito
            completed: false
        },
        {
            title: "Make it Shine!",
            description: "You discovered a shiny Pokémon.",
            goal: 1,
            hasCookie: "", //cookie con brillo
            completed: false
        },
        {
            title: "Evolution Complete",
            description: "You evolved a Pokémon for the first time.",
            goal: 1,
            hasCookie: "", //cookie con evolucion
            completed: false
        },
        {
            title: "Ketchup",
            description: "You caught all of Ash's Pokémon.",
            goal: 50,
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
            title: "Found a Variant",
            description: "You discovered a Pokémon variant.",
            goal: 1,
            hasCookie: "",
            completed: false
        },
        {
            title: "Evolution Chain Master",
            description: "You completed an entire evolution chain.",
            goal: 1,
            hasCookie: "", //validar todas las cadenas de evolucion o remover
            completed: false
        },
        {
            title: "Retro Mode Unlocked",
            description: "You unlocked Retro Mode.",
            goal: 1,
            hasCookie: "", //donaciones
            completed: false
        }
    ]);
    const [notifications, setNotifications] = useState<AchievementProps[]>([]);

    const setAchievement = (index: number) => {
        achievements[index].completed = true;
    }

    /**
     * verifica todos los trofeos
     * si no está completado validar su objetivo
     */
    const checkAchievements = () => {
        achievements.map((achievement) => {
            if (!achievement.completed) {
                // if (capturedList.length >= achievement.goal) {

                // }
            }
        })
    }

    const updateAchievements = (pokemonCount: number) => {
        //actualizar total de pokemon
        //preguntar por los achievements que no estan completos, si su objetivo es igual al nuevo total
        achievements.map((element) => {
            if (!element.completed) {
                if (element.goal <= pokemonCount) {
                    element.completed = true;
                    //mostrar notificacion
                }
            }
        });
    }

    const showNotification = (id: number) => {
        console.log('notificacion pedida ->', id);
        const achievement = getAchievement(id);
        if (achievement !== null) {
            setNotifications(prev => [...prev, achievement]);
        }
    }

    const removeNotification = (id: number) => {
        setNotifications(prev => prev.filter((_, index) => index !== id));
    }

    const getAchievement = (id: number): AchievementProps | null => {
        if (id >= 0 && id <= achievements.length) {
            return achievements[id];
        }
        return null;
    }

    return (
        <AchievementsContext.Provider value={{
            achievements,
            notifications,
            setAchievement,
            checkAchievements,
            updateAchievements,
            showNotification,
            getAchievement,
            removeNotification
        }}>
            {children}
        </AchievementsContext.Provider>
    )
}

export const useAchievements = () => {
    const context = useContext(AchievementsContext);
    if (!context) throw new Error("useAchievement must be used within AchievementProvider");
    return context;
};
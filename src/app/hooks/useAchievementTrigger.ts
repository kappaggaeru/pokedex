import { useEffect } from 'react';
import { usePokemon } from '../context/pokemonContext';
import { useAchievements } from '../context/achievementsContext';

/**
 * Hook personalizado que maneja la comunicación entre PokemonContext y AchievementsContext
 * para disparar achievements relacionados con el tier de Pokémon
 */
export const useAchievementTrigger = () => {
    const { tier, capturedList, selectedPokemon } = usePokemon();
    const { updateCountAchievements, checkTierAchievement } = useAchievements();

    // Actualizar achievements cuando cambie la lista de capturados
    useEffect(() => {
        if (capturedList.length > 0) {
            updateCountAchievements(capturedList);
        }
    }, [capturedList, updateCountAchievements]);

    // Verificar achievements de tier cuando se capture un Pokémon
    useEffect(() => {
        if (selectedPokemon && capturedList.includes(selectedPokemon.id)) {
            // Verificar si el Pokémon recién capturado es legendary o mythical
            if (tier === 'legendary' || tier === 'mythical') {
                checkTierAchievement(selectedPokemon.id, tier);
            }
        }
    }, [selectedPokemon, capturedList, tier, checkTierAchievement]);

    return {
        // Puedes retornar funciones adicionales si necesitas más control
        triggerTierAchievement: (id: number, pokemonTier: string) => checkTierAchievement(id, pokemonTier),
        triggerUpdateAchievements: (list: number[]) => updateCountAchievements(list)
    };
};
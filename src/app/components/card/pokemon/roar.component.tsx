import { useRef, useState } from "react";
import DefaultButton from "@/app/buttons/default.button";
import { Volume1, Volume2, VolumeOffIcon, VolumeX } from "lucide-react";
import { useAccesibility } from "@/app/context/accesibilityContext";
import { useAchievements } from "@/app/context/achievementsContext";

interface Props {
    cries: {
        latest?: string;
        legacy?: string;
    };
}

export const RoarComponent: React.FC<Props> = ({ cries }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playLatestNext, setPlayLatestNext] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { enabledSoundEffects } = useAccesibility();
    const { setSpecialAchievement } = useAchievements();

    // Detectar si hay pistas disponibles
    const hasLatest = !!cries.latest;
    const hasLegacy = !!cries.legacy;

    // Si no hay ningún cry, deshabilitar la funcionalidad
    const hasAnyCry = hasLatest || hasLegacy;

    const getNextCry = (): string | null => {
        if (hasLatest && hasLegacy) {
            return playLatestNext ? cries.latest! : cries.legacy!;
        } else if (hasLatest) {
            return cries.latest!;
        } else if (hasLegacy) {
            return cries.legacy!;
        } else {
            return null;
        }
    };

    const playCry = () => {
        const nextCry = getNextCry();

        if (!nextCry) return;

        // Alternar solo si hay ambos
        if (hasLatest && hasLegacy) {
            setPlayLatestNext((prev) => !prev);
        }

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const audio = new Audio(nextCry);
        audioRef.current = audio;
        setIsPlaying(true);

        audio.play().catch((err) => {
            console.error("Error al reproducir el llanto:", err);
            setIsPlaying(false);
        });

        audio.onended = () => {
            setIsPlaying(false);
        };

        setSpecialAchievement(9);
    };

    // Icono dinámico según estado
    const getIcon = () => {
        if (!enabledSoundEffects) return VolumeOffIcon;
        if (!hasAnyCry) return VolumeX;
        return isPlaying ? Volume2 : Volume1;
    };

    return (
        <DefaultButton
            onClick={hasAnyCry ? playCry : () => { }}
            isVisible={true}
            disabled={!enabledSoundEffects}
            icon={getIcon()}
        />
    );
};

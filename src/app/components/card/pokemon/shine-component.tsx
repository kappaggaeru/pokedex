import DefaultButton from "@/app/buttons/default.button";
import { useAccesibility } from "@/app/context/accesibilityContext";
import { useAchievements } from "@/app/context/achievementsContext";
import { Sparkle, Sparkles } from "lucide-react";
import { useState } from "react";
import { playSound } from "react-sounds";

type Props = {
    onClick: () => void;
}

export const ShineComponent: React.FC<Props> = ({ onClick }) => {
    const [isShining, setIsShining] = useState(false);
    const { setSpecialAchievement } = useAchievements();
    const { enabledSoundEffects } = useAccesibility();
    const voidSound = "/assets/sounds/void.mp3";


    function toggleSpark() {
        setIsShining(!isShining);
        setSpecialAchievement(10);
        onClick();
        if (enabledSoundEffects) {
            playSound(voidSound);
        }
    }

    return (
        <DefaultButton
            icon={!isShining ? Sparkle : Sparkles}
            onClick={toggleSpark}
            isVisible={true}
            className={`${!isShining ? "" : "text-yellow-300 dark:text-yellow-500"}`}
        />
    );
}
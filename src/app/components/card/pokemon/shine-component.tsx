import DefaultButton from "@/app/buttons/default.button";
import { useAchievements } from "@/app/context/achievementsContext";
import { Sparkle, Sparkles } from "lucide-react";
import { useState } from "react";

type Props = {
    onClick: () => void;
}

export const ShineComponent: React.FC<Props> = ({ onClick }) => {
    const [isShining, setIsShining] = useState(false);
    const { setSpecialAchievement } = useAchievements();

    function toggleSpark() {
        setIsShining(!isShining);
        setSpecialAchievement(10);
        onClick();
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
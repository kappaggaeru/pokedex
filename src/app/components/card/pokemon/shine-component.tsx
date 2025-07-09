import DefaultButton from "@/app/buttons/default.button";
import { usePokemon } from "@/app/context/pokemonContext";
import { Sparkle, Sparkles } from "lucide-react";

type Props = {
    onClick: () => void;
}

export const ShineComponent: React.FC<Props> = ({ onClick }) => {
    const { shouldBlinkArtwork, setShouldBlinkArtwork } = usePokemon();

    function toggleSpark() {
        setShouldBlinkArtwork(!shouldBlinkArtwork);
        onClick();
    }

    return (
        <DefaultButton
            icon={!shouldBlinkArtwork ? Sparkle : Sparkles}
            onClick={toggleSpark}
            isVisible={true}
            className={`${!shouldBlinkArtwork ? "" : "text-yellow-300 dark:text-yellow-500"}`}
        />
    );
}
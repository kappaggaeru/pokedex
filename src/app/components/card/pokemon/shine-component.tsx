import DefaultButton from "@/app/buttons/default.button";
import { Sparkle, Sparkles } from "lucide-react";
import { useState } from "react";

type Props = {
    onClick: () => void;
}

export const ShineComponent: React.FC<Props> = ({ onClick }) => {
    const [isSparking, setIsSparking] = useState(false);

    function toggleSpark() {
        setIsSparking(!isSparking);
        onClick();
    }

    return (
        <DefaultButton
            icon={!isSparking ? Sparkle : Sparkles}
            onClick={toggleSpark}
            isVisible={true}
            className={`${!isSparking ? "" : "text-yellow-300 dark:text-yellow-500"}`}
        />
    );
}
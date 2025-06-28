import { LucideIcon } from "lucide-react";
import React from "react";
import { usePokemonTier } from "../context/pokemonContext";

interface DefaultButtonProps {
    onClick: () => void;
    isVisible: boolean;
    icon: LucideIcon;
    className?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
    onClick,
    isVisible,
    icon: Icon,
    className = "",
}) => {
    const { tier } = usePokemonTier();
    return (
        <button
            onClick={onClick}
            className={`
                w-12 h-12 rounded-full
                
                text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white
                border border-gray-200/50 dark:border-gray-600/50
                shadow-lg backdrop-blur-xl
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                ${className}
                ${tier === "legendary"
                    ? "bg-legendary dark:text-gray-200"
                    : tier === "mythical"
                        ? "bg-mythical"
                        : "bg-white/80 dark:bg-slate-800/80"
                }
            `}
        >
            <Icon className="w-6 h-6" />
        </button>
    );
};

export default DefaultButton;

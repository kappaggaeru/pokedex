import React from "react";
import { usePokemonTier } from "../context/pokemonContext";
import { DefaultButtonProps } from "../models/props/default-buttons.props";

const DefaultButton: React.FC<DefaultButtonProps> = ({
    onClick,
    title,
    isVisible,
    icon: Icon,
    className = "",
}) => {
    const { tier } = usePokemonTier();
    return (
        <button
            onClick={onClick}
            className={`
                ${title ? "w-fit p-2 px-4" : "w-12"} h-12 rounded-full
                text-gray-600 hover:text-gray-900 dark:hover:text-white
                border border-gray-200/50 dark:border-gray-600/50
                shadow-lg backdrop-blur-xl
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                ${className}
                ${tier === "legendary"
                    ? "bg-legendary dark:text-gray-300"
                    : tier === "mythical"
                        ? "bg-mythical dark:text-gray-300"
                        : "bg-white/80 dark:bg-slate-800/80 dark:text-gray-400"
                }
            `}
        >
            {title &&
                <div className="flex flex-row gap-2">
                    <Icon className="w-6 h-6" />
                    {title}
                </div>
            }
            {!title &&
                <Icon className="w-6 h-6" />
            }
        </button>
    );
};

export default DefaultButton;

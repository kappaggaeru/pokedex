import React from "react";
import { usePokemon } from "../context/pokemonContext";
import { DefaultButtonProps } from "../models/props/default-buttons.props";

const DefaultButton: React.FC<DefaultButtonProps> = ({
    onClick,
    title,
    isVisible = true,
    icon: Icon,
    className = "",
    disabled = false,
    altText,
}) => {
    const { tier } = usePokemon();

    const baseColor =
        tier === "legendary"
            ? "bg-legendary dark:text-gray-300"
            : tier === "mythical"
                ? "bg-mythical dark:text-gray-300"
                : "bg-white/80 dark:bg-slate-800/80 text-gray-500 dark:text-gray-400";

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                ${title ? "w-fit p-2 px-4" : "w-12"} h-12 rounded-full
                flex items-center justify-center
                border border-gray-200/50 dark:border-gray-600/50
                shadow-lg backdrop-blur-xl
                transition-all duration-300
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                ${disabled ? "cursor-not-allowed opacity-50 scale-100" : "hover:scale-110 cursor-pointer"}
                ${!disabled ? "hover:text-gray-900 dark:hover:text-white" : ""}
                ${baseColor}
                ${className}
            `}
        >
            {title ? (
                <div className="flex flex-row gap-2 items-center">
                    <Icon className={`w-6 h-6 ${disabled ? "opacity-40" : ""}`} />
                    <span className={`${disabled ? "opacity-60" : ""}`}>
                        {title && !altText && title}
                        {title && altText && (
                            <div>
                                <span className="md:hidden">{title}</span>
                                <span className="hidden md:block px-1 rounded-md shadow-[inset_0_-1px_2px] shadow-black/10 select-none dark:bg-white/10 dark:shadow-white/10 dark:text-shadow-xs">
                                    {altText}
                                </span>
                            </div>
                        )}
                    </span>
                </div>
            ) : (
                <Icon className={`w-6 h-6 ${disabled ? "opacity-40" : ""}`} />
            )}
        </button>
    );
};

export default DefaultButton;

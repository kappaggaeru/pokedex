import { LucideIcon } from "lucide-react";
import React from "react";

interface DefaultButtonProps {
    onClick: () => void;
    isVisible?: true;
    icon: LucideIcon;
    className?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
    onClick,
    isVisible,
    icon: Icon,
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                w-12 h-12 rounded-full
                bg-white dark:bg-slate-800
                text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white
                border border-gray-200/50 dark:border-gray-600/50
                flex items-center justify-center
                transition-all duration-200
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                ${className}
                `}
        >
            <Icon className="w-6 h-6" />
        </button>
    );
};

export default DefaultButton;

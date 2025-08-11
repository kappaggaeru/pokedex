import React from "react";

interface KeyButtonProps {
    children: React.ReactNode;
}

export const KeyButton: React.FC<KeyButtonProps> = ({ children }) => {
    return <span className="px-1 rounded-md shadow-[inset_0_-1px_2px] shadow-black/10 select-none dark:bg-white/10 dark:shadow-white/10 dark:text-shadow-xs">{children}</span>;
};
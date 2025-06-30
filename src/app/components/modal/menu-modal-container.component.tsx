import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

type MenuModalProps = {
    title: string;
    isOpen: boolean;
    children: ReactNode;
    toggleContainer: () => void;
}

export const MenuModalContainerComponent = ({ children, title, isOpen, toggleContainer }: MenuModalProps) => {
    return (
        <div className="p-4 border border-gray-200/50 dark:border-gray-600/50 rounded-xl flex flex-col gap-4 shadow-lg">
            <div className="flex flex-row justify-between items-center text-gray-500 cursor-pointer" onClick={toggleContainer}>
                <h3 className="text-xl capitalize text-gray-300">{title}</h3>
                <div className={`
                    transition-all duration-300
                    ${isOpen ? "rotate-180" : "rotate-0"}
                `}>
                    <ChevronDown />
                </div>
            </div>
            <div className={`
                overflow-auto transition-all duration-300
                ${isOpen ? "py-3 opacity-100" : "max-h-0 py-0 opacity-0"
            }`}>
                {children}
            </div>
        </div>
    )
}
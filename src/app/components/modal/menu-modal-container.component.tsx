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
        <div className="
            border bg-white/80 dark:bg-slate-800/80
            border-gray-200/50 dark:border-gray-600/50
            rounded-xl flex flex-col shadow-lg cursor-pointer"
        >
            <div className="flex flex-row justify-between items-center text-gray-500 p-4" onClick={toggleContainer}>
                <h3 className="text-xl capitalize text-gray-600 dark:text-gray-300">{title}</h3>
                <div className={`
                    transition-all duration-300
                    ${isOpen ? "rotate-180" : "rotate-0"}
                    `}>
                    <ChevronDown />
                </div>
            </div>
            <div className={`overflow-auto transition-all duration-300 ${isOpen ? "p-4 opacity-100" : "max-h-0 opacity-0"}`}>
                {children}
            </div>
        </div>
    )
}
import { X } from "lucide-react";

const CloseButton = ({ onClick, isVisible }: { onClick: () => void; isVisible: boolean }) => {
    return (
        <button
            onClick={onClick}
            className={`
                z-10
                w-12 h-12 rounded-full 
                bg-white dark:bg-slate-800 
                text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white
                shadow-md backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50
                flex items-center justify-center
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
            `}
        >
            <X className="w-6 h-6" />
        </button>
    );
};

export default CloseButton;

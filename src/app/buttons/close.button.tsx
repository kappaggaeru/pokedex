import { X } from "lucide-react";

const CloseButton = ({ onClick, isVisible }: { onClick: () => void; isVisible: boolean }) => {
    return (
        <button
            onClick={onClick}
            className={`
                absolute bottom-4 left-1/2 transform -translate-x-1/2
                w-12 h-12 rounded-full bg-white/80 text-black shadow-md backdrop-blur-md
                flex items-center justify-center
                transition-all duration-300 ease-in-out
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
            `}
        >
            <X className="w-6 h-6" />
        </button>
    );
};

export default CloseButton;

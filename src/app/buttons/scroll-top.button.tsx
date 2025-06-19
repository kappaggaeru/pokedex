import { ArrowUp } from 'lucide-react';

const ScrollTopButton = ({ onClick, isVisible }: { onClick: () => void; isVisible: boolean }) => {
    return (
        <button
            onClick={onClick}
            className={`
                fixed bottom-5 right-5 z-50
                w-12 h-12 bg-white/80 backdrop-blur-md rounded-full border border-gray-200/50 shadow-lg
                flex items-center justify-center transition-opacity duration-300
                ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
        >
            <ArrowUp className="w-6 h-6" />
        </button>
    );
}

export default ScrollTopButton;
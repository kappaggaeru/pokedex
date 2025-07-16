import { usePokemon } from "@/app/context/pokemonContext";
import { useInView } from "@/app/hooks/useInView";
import { GenericCardProps } from "@/app/models/props/generic-card.props";

export const GenericCardContainerComponent: React.FC<GenericCardProps> = ({ title, children }) => {
    const { tier } = usePokemon();
    const { ref, isInView } = useInView<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={`
                transition-all duration-1000 ease-out
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                p-4 my-4 mx-6 shadow-xl rounded-xl
                border border-gray-200/50 dark:border-gray-600/50
                text-black dark:text-gray-300
                ${tier === "legendary" ? 'bg-legendary glow-legendary'
                    : tier === "mythical" ? 'bg-mythical glow-mythical'
                        : 'bg-white dark:bg-slate-800'}
            `}
        >
            {title && <h3 className="text-xl font-bold mb-4 capitalize">{title}</h3>}
            <div>
                {children}
            </div>
        </div>
    );
};

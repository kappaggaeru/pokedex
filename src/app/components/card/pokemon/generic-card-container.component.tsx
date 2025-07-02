import { usePokemon } from "@/app/context/pokemonContext";
import { GenericCardProps } from "@/app/models/props/generic-card.props";

export const GenericCardContainerComponent: React.FC<GenericCardProps> = ({ title, children }) => {
    const { tier } = usePokemon();

    return (
        <div
            className={`
                p-[1rem] my-[1rem] mx-6 shadow-xl rounded-xl
                border border-gray-200/50 dark:border-gray-600/50
                text-black dark:text-gray-300
                bg-white dark:bg-slate-800 
                ${tier == "legendary" ? 'bg-legendary glow-legendary'
                    : tier == "mythical" ? 'bg-mythical glow-mythical'
                        : 'bg-white dark:bg-slate-800'}
            `} >
            {title && <h3 className="text-xl font-bold mb-[1rem] capitalize">{title}</h3>}
            <div>
                {children}
            </div>
        </div >
    )
}
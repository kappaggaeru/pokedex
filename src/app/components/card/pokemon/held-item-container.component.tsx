import { formatText } from "@/app/utils/stringUtils"
import { ItemProps } from "./held-items.list"
import { usePokemon } from "@/app/context/pokemonContext";

export const HeldItemComponent: React.FC<ItemProps> = ({ title, sprite, effect }) => {
    const { tier } = usePokemon();
    const baseColor =
        tier === "legendary"
            ? "bg-legendary dark:text-gray-300"
            : tier === "mythical"
                ? "bg-mythical dark:text-gray-300"
                : "bg-slate-50 dark:bg-slate-700/80 text-gray-400";
    return (
        <div className={`
            flex flex-row gap-4 rounded-lg p-4 items-start
            border border-slate-100 dark:border-gray-600/50
            ${baseColor}
        `}>
            <div className={`p-4 border border-slate-100 dark:border-gray-600/50 rounded-lg ${baseColor}`}>
                <div className="w-6 h-6 text-slate-500 flex justify-center items-center">
                    <img src={sprite} alt={title} className="w-12 h-12 object-contain flex items-center" title={title} />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-md bolder text-gray-600 dark:text-gray-300 capitalize">{formatText(title, '-')}</div>
                <div className="text-gray-500 text-sm">
                    {effect ? effect : 'N/A'}
                </div>
            </div>
        </div>
    )
}
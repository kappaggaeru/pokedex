import { usePokemon } from "@/app/context/pokemonContext";
import { AbilityProps } from "./ability-list.component";

export const AbilityComponent: React.FC<AbilityProps> = ({ name, effect, shortEffect }) => {
    const { tier } = usePokemon();
    const baseColor =
        tier === "legendary"
            ? "bg-legendary dark:text-gray-300"
            : tier === "mythical"
                ? "bg-mythical dark:text-gray-300"
                : "bg-slate-50 dark:bg-slate-700/80 text-gray-400";
    return (
        <div className={`
            rounded-lg border border-slate-100 dark:border-gray-600/50 p-4 flex flex-col gap-2
            ${baseColor}
        `}>
            <h1 className="text-lg text-gray-600 dark:text-gray-300 bolder capitalize">{name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{effect ? effect : "N/A"}</p>
            <span className="text-sm text-gray-400">{shortEffect}</span>
        </div>
    );
}
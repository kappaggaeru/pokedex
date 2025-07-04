import { usePokemon } from "@/app/context/pokemonContext";
import { AbilityProps } from "./ability-list.component";

export const AbilityComponent: React.FC<AbilityProps> = ({ name, effect, shortEffect }) => {
    const { tier } = usePokemon();
    return (
        <div className={`
            rounded-lg border border-gray-200/50 dark:border-gray-600/50 p-4 flex flex-col gap-2
            ${tier !== "normal" ? "bg-white/70 dark:bg-slate-600/70" : ""}
        `}>
            <h1 className="text-lg bolder capitalize">{name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{effect}</p>
            <span className="text-sm text-gray-400">{shortEffect}</span>
        </div>
    );
}
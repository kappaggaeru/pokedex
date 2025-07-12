import { usePokemon } from "../context/pokemonContext";

type Props = {
    text: string;
    onClick: () => void;
}
export const ActionButton: React.FC<Props> = ({ text, onClick }) => {
    const { tier } = usePokemon();
    const baseColor =
        tier === "legendary"
            ? "bg-legendary dark:text-gray-300"
            : tier === "mythical"
                ? "bg-mythical dark:text-gray-300"
                : "bg-slate-50 dark:bg-slate-700/70 text-gray-500 dark:text-gray-400";
    return (
        <button
            onClick={onClick}
            className={`
                border border-slate-100 dark:border-gray-600/50 py-2 px-4 w-full rounded-xl
                hover:scale-110 transition-all duration-300
                focus:border-indigo-400 focus:dark:border-indigo-500
                ${baseColor}
                capitalize
            `}
        >
            {text}
        </button>
    )
}
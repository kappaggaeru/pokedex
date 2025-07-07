import { ChevronLeft, ChevronRight } from "lucide-react";
import DefaultButton from "@/app/buttons/default.button";
import { useCallback } from "react";
import { usePokemon } from "@/app/context/pokemonContext";

interface Props {
    id: number;
    selectPokemon: (id: number) => void;
}

const MIN_ID = 1;
const MAX_ID = 1025;

export const IdControllerComponent: React.FC<Props> = ({ id, selectPokemon }) => {
    const { tier } = usePokemon();
    const prevPokemon = useCallback(() => {
        if (id > MIN_ID) {
            selectPokemon(id - 1);
        }
    }, [id, selectPokemon]);

    const nextPokemon = useCallback(() => {
        if (id < MAX_ID) {
            selectPokemon(id + 1);
        }
    }, [id, selectPokemon]);

    const baseColor =
        tier === "legendary"
            ? "bg-legendary dark:text-gray-300"
            : tier === "mythical"
                ? "bg-mythical dark:text-gray-300"
                : "bg-white/80 dark:bg-slate-800/80 text-gray-400";

    return (
        <div className={`
            flex flex-row justify-between items-center gap-2 rounded-3xl
            border border-gray-200/50 dark:border-gray-600/50
            ${baseColor}
        `}>
            <DefaultButton
                icon={ChevronLeft}
                onClick={prevPokemon}
                isVisible={true}
                disabled={id === MIN_ID || id > MAX_ID}
                className={"shadow-none"}
            />
            <span className="text-gray-400 min-w-10 text-center">#{id}</span>
            <DefaultButton
                icon={ChevronRight}
                onClick={nextPokemon}
                isVisible={true}
                disabled={id >= MAX_ID}
                className={"shadow-none"}
            />
        </div>
    );
};

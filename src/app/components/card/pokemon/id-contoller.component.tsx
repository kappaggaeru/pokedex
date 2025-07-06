import { Minus, Plus } from "lucide-react";
import DefaultButton from "@/app/buttons/default.button";
import { useCallback } from "react";

interface Props {
    id: number;
    selectPokemon: (id: number) => void;
}

const MIN_ID = 1;
const MAX_ID = 1025;

export const IdControllerComponent: React.FC<Props> = ({ id, selectPokemon }) => {
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

    return (
        <div className="
      bg-white rounded-3xl
      flex flex-row justify-between items-center gap-2
      border border-gray-200/50 dark:border-gray-600/50
    ">
            <DefaultButton
                icon={Minus}
                onClick={prevPokemon}
                isVisible={true}
                disabled={id === MIN_ID || id > MAX_ID}
            />
            <span className="text-gray-400 min-w-10 text-center">#{id}</span>
            <DefaultButton
                icon={Plus}
                onClick={nextPokemon}
                isVisible={true}
                disabled={id >= MAX_ID}
            />
        </div>
    );
};

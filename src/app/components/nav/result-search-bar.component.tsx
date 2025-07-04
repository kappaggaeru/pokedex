import { usePokemon } from "@/app/context/pokemonContext";

type Props = {
    id: number;
    name: string;
    clearSearch: (id: number) => void;
}
export const ResultSearchBarComponent: React.FC<Props> = ({ id, name, clearSearch }) => {
    return (
        <div className="
            border border-gray-200/50 dark:border-gray-600/50 
            p-2 px-4 rounded-xl bg-white dark:bg-slate-800
            cursor-pointer 
            group-hover/result:text-dark dark:hover:text-white"
            onClick={() => clearSearch(id)}
        >
            <p className="uppercase flex flex-row gap-2 items-center text-gray-500 dark:text-gray-400"><span className="text-sm text-gray-500">#{id}</span>{name}</p>
        </div>
    )
}
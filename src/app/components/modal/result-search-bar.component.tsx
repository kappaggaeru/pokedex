
type Props = {
    id: number;
    name: string;
    completeSearch: (id: number) => void;
    isSelected?: boolean;
}
export const ResultSearchBarComponent: React.FC<Props> = ({ id, name, completeSearch, isSelected }) => {
    return (
        <div className={`
            border border-gray-200/50 dark:border-gray-600/50
            p-2 px-4 rounded-xl 
            cursor-pointer
            ${isSelected ? "bg-slate-100 dark:bg-slate-700" : "bg-white dark:bg-slate-800"}
            hover:bg-slate-100 dark:hover:bg-slate-700
            `}
            onClick={() => completeSearch(id)}
        >
            <p className="uppercase flex flex-row gap-2 items-center text-gray-500 dark:text-gray-400"><span className="text-sm text-gray-500">#{id}</span>{name}</p>
        </div>
    )
}
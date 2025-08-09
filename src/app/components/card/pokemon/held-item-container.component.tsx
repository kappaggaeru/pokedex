import { formatText } from "@/app/utils/stringUtils"
import { ItemProps } from "./held-items.list"

export const HeldItemComponent: React.FC<ItemProps> = ({ title, sprite, effect }) => {
    return (
        <div className="
            flex flex-row gap-4 rounded-lg p-4 items-center
            bg-slate-50 dark:bg-slate-700/70 text-gray-400
            border border-slate-100 dark:border-gray-600/50
        ">
            <div className="p-4 border border-slate-100 dark:border-gray-600/50 rounded-lg">
                <div className="w-6 h-6 text-slate-500 flex justify-center items-center">
                    <img src={sprite} alt={title} className="w-6 h-6" title={title} />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-md bolder text-gray-600 dark:text-gray-300 capitalize">{formatText(title, '-')}</div>
                <div className="text-gray-400 text-sm">
                    {effect ? effect : 'N/A'}
                </div>
            </div>
        </div>
    )
}
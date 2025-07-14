export const AchievementCardComponent = ({
    title,
    desc,
    goal,
    isCompleted,
    onClick
}: {
    title: string;
    desc: string;
    goal: number;
    isCompleted: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            onClick={onClick}
            className={`
                flex flex-row gap-3 rounded-2xl p-2 w-full border
                ${isCompleted ? "bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-500" :
                    "bg-slate-50 dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50"}
            `}
        >
            <div className={`
                rounded-xl w-[7rem] h-20 border 
                ${isCompleted ? "border-indigo-300 dark:border-indigo-500 text-indigo-700 dark:text-indigo-300" : "border-gray-200/50 dark:border-gray-600/50 text-black dark:text-gray-300"}
                flex items-center justify-center
                cursor-default my-auto
            `}>
                <span>{goal}</span>
            </div>
            <div className="flex flex-col w-full h-fit overflow-visible">
                <p className={`
                    text-md bold cursor-default
                    ${isCompleted ? "text-indigo-700 dark:text-indigo-300" : "text-gray-800 dark:text-gray-400"}
                `}>{title}</p>
                <span className={`
                    text-sm cursor-default
                    ${isCompleted ? "text-indigo-500 dark:text-indigo-300" : "text-gray-700 dark:text-gray-400"}
                `}>
                    {desc}
                </span>
            </div>
        </div>
    )
}
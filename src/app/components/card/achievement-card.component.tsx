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
                flex flex-row gap-3 rounded-2xl p-2 w-full border relative
                bg-slate-50 dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50
            `}
        >
            {isCompleted && (
                <div className="absolute bottom-0 right-0 bg-indigo-100 dark:bg-indigo-900 px-2 rounded-tl-xl rounded-br-xl">
                    <span className="uppercase text-xs text-gray-500 dark:text-gray-400">earned</span>
                </div>
            )}
            <div className={`
                rounded-xl w-[7rem] h-20 border border-gray-200/50 dark:border-gray-600/50
                ${isCompleted ? "bg-indigo-100 dark:bg-indigo-900  text-indigo-700 dark:text-indigo-300" : "text-black dark:text-gray-300"}
                flex items-center justify-center
                cursor-default my-auto
            `}>
                <span>{goal}</span>
            </div>
            <div className="flex flex-col w-full h-fit overflow-visible">
                <p className={`
                    text-md bold cursor-default
                    text-gray-800 dark:text-gray-400
                `}>{title}</p>
                <span className={`
                    text-sm cursor-default
                    text-gray-700 dark:text-gray-400
                `}>
                    {desc}
                </span>
            </div>
        </div>
    )
}

export const AchievementCardComponent = ({ title, desc, goal, onClick }: {
    title: string;
    desc: string;
    goal: number;
    onClick: () => void
}) => {
    return (
        <div
            onClick={onClick}
            className="
                rounded-2xl bg-slate-50 dark:bg-slate-800 p-2
                flex flex-row gap-3 w-full
                border border-gray-200/50 dark:border-gray-600/50
            "
        >
            <div className="
                rounded-xl w-[7rem] h-20 border border-gray-200/50 dark:border-gray-600/50
                flex items-center justify-center
                text-black dark:text-gray-300
                cursor-default my-auto
            ">
                <span>{goal}</span>
            </div>
            <div className="flex flex-col w-full h-fit overflow-visible">
                <p className="text-md bold text-gray-800 dark:text-gray-400 cursor-default">{title}</p>
                <span className="text-sm text-gray-700 dark:text-gray-400 cursor-default">{desc}</span>
            </div>
        </div>
    )
}

export const AchievementCardComponent = ({ title, desc, goal }: { title: string; desc: string; goal: number }) => {
    return (
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/20 p-2
        flex flex-row gap-3 w-full border border-gray-200/50 dark:border-gray-600/50
        ">
            <div className="
                rounded-xl w-[7rem] h-20 border border-gray-200/50 dark:border-gray-600/50
                flex items-center justify-center
                text-black dark:text-gray-300
                cursor-default
            ">
                <span>{goal}</span>
            </div>
            <div className="flex flex-col overflow-hidden w-full">
                <p className="text-md bold dark:text-gray-300 cursor-default">{title}</p>
                <span className="text-sm text-gray-700 dark:text-gray-400 cursor-default">{desc}</span>
            </div>
        </div>
    )
}
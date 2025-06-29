
export const AchievementCardComponent = ({ title, desc, goal }: { title: string; desc: string; goal: number }) => {
    return (
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/20 p-2 pr-4
        flex flex-row gap-3 w-full border border-gray-200/50 dark:border-gray-600/50
        shadow-md
        ">
            <div className="
                rounded-xl w-[30%] md:w-[40%] h-20 border border-gray-200/50 dark:border-gray-600/50
                flex items-center justify-center
                text-black dark:text-white
            ">
                <span>{goal}</span>
            </div>
            <div className="flex flex-col overflow-hidden w-full">
                <p className="text-md bold">{title}</p>
                <span className="text-sm text-gray-700 dark:text-gray-400">{desc}</span>
            </div>
        </div>
    )
}
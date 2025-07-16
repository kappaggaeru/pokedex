import React from "react";
import { useAchievements } from "@/app/context/achievementsContext";
import { LucideIcon, Lock } from "lucide-react";

export const AchievementCardComponent = ({
    title,
    desc,
    goal,
    image,
    icon,
    isSpecial,
    isNotification,
    isCompleted,
    completedAt,
    onClick
}: {
    title: string;
    desc: string;
    goal: number;
    image: string;
    icon: LucideIcon;
    isSpecial: boolean;
    isNotification: boolean;
    isCompleted: boolean;
    completedAt: Date | undefined;
    onClick: () => void;
}) => {
    const { capturedCount } = useAchievements();
    const completedTimeAndDate = completedAt
        ? `${completedAt.getDate()}/${completedAt.getMonth() + 1} ${completedAt.getHours().toString().padStart(2, "0")}:${completedAt.getMinutes().toString().padStart(2, "0")}`
        : "";
    const progress = `${Math.floor((capturedCount / goal) * 100)} %`;

    return (
        <div className="flex flex-col">
            <div
                onClick={onClick}
                className={`
                flex flex-row gap-3 rounded-2xl p-2 w-full border relative
                ${isCompleted ? "bg-indigo-100 dark:bg-indigo-800 border-indigo-300 dark:border-indigo-500" : "bg-slate-50 dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50"}
                
            `}
            >
                <div className={`
                rounded-xl w-[7rem] h-20 border 
                ${isCompleted ? "border-indigo-300 dark:border-indigo-500" : "border-gray-200/50 dark:border-gray-600/50"}
                flex items-center justify-center
                cursor-default my-auto
            `}>
                    {
                        isNotification ?
                            React.createElement(icon, {
                                className: "w-6 h-6 text-gray-500",
                            })
                            : !isCompleted ? (
                                <Lock className="text-slate-500 dark:text-slate-400"></Lock>
                            ) : image !== "" ? (
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-12 h-12 object-contain filter"
                                />
                            ) : icon === Lock ? (
                                <span>{goal}</span>
                            ) : icon !== null ? (
                                React.createElement(icon, {
                                    className: "w-6 h-6 text-slate-500 dark:text-slate-400",
                                })
                            ) : null}
                </div>
                <div className="flex flex-col w-full h-fit overflow-visible">
                    <p className={`
                    text-md bold cursor-default
                    text-gray-800 dark:text-gray-300
                `}>{title}</p>
                    <span className={`
                    text-sm cursor-default
                    text-gray-700 dark:text-gray-400
                `}>
                        {desc}
                    </span>
                </div>
            </div>
            {!isNotification && !isSpecial && !isCompleted && (
                <div className={`
                mx-4 p-2 h-4 rounded-bl-lg rounded-br-lg border border-gray-200/50 dark:border-gray-600/50 border-t-0
                flex flex-row justify-between items-center text-xs 
                ${isCompleted ? "bg-indigo-600 dark:bg-indigo-900 text-white border-none" : "bg-slate-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400"}
            `}>
                    <span>{!isCompleted ? "In progress" : "Completed"}</span>
                    {isCompleted && completedAt && (
                        <span className="uppercase">{completedTimeAndDate}</span>
                    )}
                    {!isCompleted && !isSpecial && progress}
                </div>
            )}
            {!isNotification && isCompleted && (
                <div className={`
                mx-4 p-2 h-4 rounded-bl-lg rounded-br-lg border border-gray-200/50 dark:border-gray-600/50 border-t-0
                flex flex-row justify-between items-center text-xs 
                ${isCompleted ? "bg-indigo-600 dark:bg-indigo-900 text-white dark:text-gray-200 border-none" : "bg-slate-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400"}
            `}>
                    <span>Completed</span>
                    <span className="uppercase">{completedTimeAndDate}</span>
                </div>
            )}
        </div>
    )
}
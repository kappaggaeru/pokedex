import React, { useEffect, useState } from "react";
import { LucideIcon, Lock } from "lucide-react";
import { DonutProgress } from "./pokemon/donut-progress.component";
import { useAchievements } from "@/app/context/achievementsContext";
import { getSprite } from "@/app/services/pokemon.service";

export const AchievementCardComponent = ({
    title,
    desc,
    goal,
    idCapture,
    image,
    icon,
    type,
    isSpecial,
    isNotification,
    isCompleted,
    onClick
}: {
    title: string;
    desc: string;
    goal: number;
    idCapture: number;
    image: string;
    icon: LucideIcon;
    type: string;
    isSpecial: boolean;
    isNotification: boolean;
    isCompleted: boolean;
    completedAt: Date | undefined;
    onClick: () => void;
}) => {
    const { capturedCount, capturedAshCount } = useAchievements();
    const percentageAchievement = Math.floor((capturedCount / goal) * 100) > 100 ? 100 : Math.floor((capturedCount / goal) * 100);
    const percentageAshAchievement = Math.floor((capturedAshCount / goal) * 100) > 100 ? 100 : Math.floor((capturedAshCount / goal) * 100);
    const [sprite, setSprite] = useState("");

    useEffect(() => {
        const loadLegendaryOrMythicalSprite = async () => {
            try {
                const blob = await getSprite(idCapture);
                const objectURL = URL.createObjectURL(blob);
                setSprite(objectURL);
            } catch (e) {
                console.error("Error fetching legendary or mythical sprite", e);
            }
        }

        if (idCapture !== 0) {
            loadLegendaryOrMythicalSprite();
        }
    }, [idCapture, type]);

    return (
        <div className="flex flex-col">
            <div
                onClick={onClick}
                className={`
                flex flex-row gap-3 rounded-2xl p-2 w-full border relative
                ${isCompleted ? "bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-500"
                        : "bg-slate-50 dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50"}
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
                            ) : sprite !== "" ? (
                                <img
                                    src={sprite}
                                    alt={sprite}
                                    className="w-12 h-12 object-contain filter"
                                />
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
                {!isSpecial && !isCompleted && !isNotification && capturedCount > 0 && (
                    <div className="absolute bottom-0 right-0 pb-2 pr-2 flex flex-row gap-2">
                        <DonutProgress
                            percentage={type !== "capture_specific" ? percentageAchievement : percentageAshAchievement}
                            isCompleted={isCompleted}
                            percentageAchievement={type !== "capture_specific" ? percentageAchievement : percentageAshAchievement}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
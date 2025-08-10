import { useTheme } from "@/app/context/themeContext";
import { useInView } from "@/app/hooks/useInView";
import { useEffect, useState } from "react";

export const DonutProgress = ({
    percentage = 75,
    isCompleted = false,
    percentageAchievement = 75,
}: {
    percentage: number;
    isCompleted?: boolean;
    percentageAchievement?: number;
}) => {
    const {currentTheme, resolvedTheme} = useTheme();
    const bgGray = resolvedTheme == "dark" && currentTheme == "system" || currentTheme === 'dark' ? "#374151" : "#e5e7eb";
    const { ref, isInView } = useInView<HTMLDivElement>(0.6);

    const [progress, setProgress] = useState(0);
    const [displayedNumber, setDisplayedNumber] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        // Animar porcentaje visual
        let start = 0;
        const duration = 2000; // 2 segundos
        const step = 10; // ms
        const totalSteps = duration / step;
        const increment = percentage / totalSteps;

        const interval = setInterval(() => {
            start += increment;
            if (start >= percentage) {
                start = percentage;
                clearInterval(interval);
            }
            setProgress(Math.round(start));
        }, step);

        // Animar número
        let num = 0;
        const numberInterval = setInterval(() => {
            num++;
            if (num >= percentageAchievement) {
                num = percentageAchievement;
                clearInterval(numberInterval);
            }
            setDisplayedNumber(num);
        }, duration / percentageAchievement);

        return () => {
            clearInterval(interval);
            clearInterval(numberInterval);
        };
    }, [isInView, percentage, percentageAchievement]);

    return (
        <div
            ref={ref}
            className="relative w-8 h-8 rounded-full"
            style={{
                background: `conic-gradient(#818cf8 ${progress}%, ${bgGray} ${progress}% 100%)`
            }}
        >
            <div
                className={`absolute inset-1 rounded-full
                    ${isCompleted ? "bg-indigo-100 dark:bg-indigo-900" : "bg-slate-50 dark:bg-slate-800"}
                `}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-gray-400">{displayedNumber}</span>
            </div>
        </div>
    );
};

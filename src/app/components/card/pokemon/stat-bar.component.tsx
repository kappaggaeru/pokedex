import { StatBarProps } from "@/app/models/props/pokedex-stat.props";
import { useEffect, useState } from "react";
import { useInView } from "@/app/hooks/useInView";

const colorClasses: Record<StatBarProps["color"], string> = {
    green: "bg-green-500 dark:bg-green-400",
    red: "bg-red-500 dark:bg-red-400",
    blue: "bg-blue-500 dark:bg-blue-400",
    violet: "bg-violet-500 dark:bg-violet-400",
    lightblue: "bg-sky-400 dark:bg-sky-300",
    yellow: "bg-yellow-400 dark:bg-yellow-300",
    pink: "bg-pink-400 dark:bg-pink-300"
};

export const StatBar: React.FC<StatBarProps> = ({ title, value, color }) => {
    const [animatedWidth, setAnimatedWidth] = useState(0);
    const { ref, isInView } = useInView<HTMLDivElement>();

    useEffect(() => {
        if (!isInView) return;

        const clampedValue = Math.min(value, 100);
        setAnimatedWidth(0);
        const timeout = setTimeout(() => {
            setAnimatedWidth(clampedValue);
        }, 100);

        return () => clearTimeout(timeout);
    }, [isInView, value]);

    return (
        <div ref={ref} className="mb-[1rem]">
            <div className="flex justify-between">
                <h5 className="capitalize text-gray-700 dark:text-gray-300">{title}</h5>
                <span className="text-gray-700 dark:text-gray-300">{value}</span>
            </div>
            <div className="relative h-2 rounded-xl bg-black dark:bg-slate-700 bg-opacity-10 overflow-hidden">
                <div
                    className={`h-2 rounded-xl transition-all duration-500 ease-out ${colorClasses[color]}`}
                    style={{ width: `${animatedWidth}%` }}
                />
            </div>
        </div>
    );
};

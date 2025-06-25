import { useEffect, useState } from "react";
import { StatBarProps } from "../models/props/pokedex-stat.props";

const colorClasses: Record<StatBarProps["color"], string> = {
    green: "bg-green-500 dark:bg-green-400",
    red: "bg-red-500 dark:bg-red-400",
    blue: "bg-blue-500 dark:bg-blue-400",
    violet: "bg-violet-500 dark:bg-violet-400",
    lightblue: "bg-sky-400 dark:bg-sky-300",
    yellow: "bg-yellow-400 dark:bg-yellow-300",
};

export const StatBar: React.FC<StatBarProps> = ({ title, value, color }) => {
    const [animatedWidth, setAnimatedWidth] = useState(0);

    useEffect(() => {
        const clampedValue = Math.min(value, 100);
        setAnimatedWidth(0);
        const timeout = setTimeout(() => {
            setAnimatedWidth(clampedValue);
        }, 100);
        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className="mb-[1rem]">
            <div className="flex justify-between">
                <h5 className="capitalize">{title}</h5>
                <span>{value}</span>
            </div>
            <div className="relative h-2 rounded-xl bg-black dark:bg-slate-700 bg-opacity-10 overflow-hidden transition-colors duration-200">
                <div
                    className={`h-2 rounded-xl transition-all duration-500 ${colorClasses[color]}`}
                    style={{ width: `${animatedWidth}%` }}
                />
            </div>
        </div>
    );
};

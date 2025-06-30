import { useTheme } from "@/app/context/themeContext";
import { ThemeCardProps } from "@/app/models/props/theme-card.props";
import { useEffect, useState } from "react";

export const ThemeCardComponent: React.FC<ThemeCardProps> = ({ title, icon: Icon, enabled }) => {
    const [checked, setChecked] = useState(false);
    const { currentTheme, setActiveTheme } = useTheme();

    useEffect(() => {
        setChecked(title === currentTheme);
    }, [title, currentTheme]);

    return (
        <div className={`rounded-lg p-2
        flex flex-row gap-3 w-full border border-gray-200/50 dark:border-gray-600/50
        ${enabled ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}
        ${enabled && !checked ? "hover:bg-slate-100 dark:hover:bg-slate-700 " : ""}
        ${enabled && checked ? "border-indigo-300 dark:border-indigo-500" : ""}
        ${enabled && checked ? "bg-indigo-100 dark:bg-indigo-900" : "bg-white dark:bg-slate-800/20"}
        `}
            onClick={() => {
                if (enabled) {
                    setActiveTheme(title);
                }
            }}>
            <div className="flex flex-row justify-between w-full p-4">
                <div className={`
                    flex flex-row gap-4
                    ${enabled && checked ? "text-indigo-700 dark:text-indigo-300" : ""}
                    ${enabled ? "text-gray-500" : "text-gray-200 dark:text-gray-700"}
                `}>
                    <Icon className="w-6 h-6" />
                    <p className="capitalize">{title}</p>
                </div>
                <input id={title}
                    className={`
                        box-content h-1.5 w-1.5 appearance-none rounded-full border-[5px] 
                        bg-clip-padding ring-0 outline-none
                        ring-gray-400
                        checked:border-indigo-500 checked:ring-indigo-500
                        ${enabled ? "" : "bg-white border-white dark:border-slate-800/20 dark:bg-slate-800"}
                        ${enabled && !checked ? "bg-white dark:border-slate-600 dark:bg-slate-400" : ""}
                        ${enabled && checked ? "dark:bg-white" : ""}
                        ${enabled ? "cursor-pointer" : "cursor-not-allowed"}
                    `}
                    type="radio"
                    value={title}
                    checked={checked}
                    disabled={!enabled}
                    onChange={e => setChecked(e.target.checked)}
                    name="theme_selected">
                </input>
            </div>
        </div>
    )
}
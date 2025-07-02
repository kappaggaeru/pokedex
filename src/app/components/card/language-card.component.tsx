import { LanguageOption, useLanguage } from "@/app/context/languageContext";
import { LanguageCardProps } from "@/app/models/props/language-card.props";

const LanguageCardComponent: React.FC<LanguageCardProps> = ({ title, code, enabled = true }) => {
    const { language, setLanguage } = useLanguage();
    const checked = code === language;

    return (
        <div
            className={`rounded-lg p-2
            flex flex-row gap-3 w-full border border-gray-200/50 dark:border-gray-600/50
            ${enabled ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}
            ${enabled && !checked ? "hover:bg-slate-100 dark:hover:bg-slate-700" : ""}
            ${enabled && checked ? "border-indigo-300 dark:border-indigo-500" : ""}
            ${enabled && checked ? "bg-indigo-100 dark:bg-indigo-900" : "bg-white dark:bg-slate-800/20"}
        `}
            onClick={() => {
                if (enabled && !checked) {
                    setLanguage(code as LanguageOption);
                }
            }}
        >
            <div className="flex flex-row justify-between w-full p-4">
                <div className={`
                    capitalize
                    ${enabled && checked ? "text-indigo-700 dark:text-indigo-300" : ""}
                    ${enabled ? "text-gray-500" : "text-gray-200 dark:text-gray-700"}
                `}>
                    {title}
                </div>

                <input
                    id={`lang-${code}`}
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
                    value={code}
                    checked={checked}
                    disabled={!enabled}
                    onChange={() => {
                        if (enabled && !checked) {
                            setLanguage(code as LanguageOption);
                        }
                    }}
                    name="language_selected"
                />
            </div>
        </div>
    );
};

export default LanguageCardComponent;

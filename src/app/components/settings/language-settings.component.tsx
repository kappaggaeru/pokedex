import { useState } from "react";

export const LanguageSettingsComponent: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState("en");

    return (
        <div className="border border-gray-200/50 dark:border-gray-600/50 rounded-lg">
            <select name="languageSelector" id="languageSelector" onChange={(e) => setSelectedOption(e.target.value)}
                value={selectedOption}
                className="
                block w-full px-4 py-2 bg-white dark:bg-slate-800
                text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-gray-600/50
                rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
        </div>
    );
}
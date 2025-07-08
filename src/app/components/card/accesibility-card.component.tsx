import { useAccesibility } from "@/app/context/accesibilityContext";

export const AccesibilityCardComponent = ({ type }: { type: "animations" | "sound" }) => {
    const {
        enabledAnimations,
        setEnableAnimations,
        enabledSoundEffects,
        setEnableSoundEffects,
    } = useAccesibility();

    const isEnabled = type === "animations" ? enabledAnimations : enabledSoundEffects;
    const toggle = () => {
        if (type === "animations") {
            setEnableAnimations(!enabledAnimations);
        } else {
            setEnableSoundEffects(!enabledSoundEffects);
        }
    };

    return (
        <div
            className={`rounded-lg p-2 flex flex-row gap-3 w-full border cursor-default
                ${isEnabled ? "border-indigo-300 dark:border-indigo-500" : "border-gray-200/50 dark:border-gray-600/50"}
                ${isEnabled ? "bg-indigo-100 dark:bg-indigo-900" : "bg-white dark:bg-slate-800/20"}`}
        >
            <div className="flex flex-row justify-between w-full p-4">
                <div className={`capitalize ${isEnabled ? "text-indigo-700 dark:text-indigo-300" : "text-gray-500 dark:text-gray-600"}`}>
                    {type === "animations" ? "Enable animations" : "Enable sound effects"}
                </div>

                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={toggle}
                        className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 rounded-full
                        bg-gray-200 dark:bg-gray-700 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600 after:bg-white
                        peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800
                        after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"
                    />
                </label>
            </div>
        </div>
    );
};
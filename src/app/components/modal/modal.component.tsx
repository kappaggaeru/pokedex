import CloseModalButton from "../../buttons/close-modal.button"
import { AchievementsComponent } from "./achievements.component";
import { SettingsComponent } from "./settings.component";
import { SupportComponent } from "./support.component";
import { ThemeComponent } from "./theme.component";
import { useState } from "react";
import { MenuModalContainerComponent } from "./menu-modal-container.component";

export const ModalComponent = ({ isOpen }: { isOpen: boolean }) => {
    const [achievementsVisible, setAchievementsVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [supportVisible, setSupportVisible] = useState(false);
    const [themeVisible, setThemeVisible] = useState(false);

    return (
        <div className={`
            fixed top-0 bottom-0 right-0 h-screen pb-4
            transition-all duration-300 z-50
            text-black dark:text-gray-300
            bg-white/50 dark:bg-slate-800/50 backdrop-blur-md
            border-l border-gray-200/50 dark:border-gray-600/50
            md:rounded-tl-xl md:rounded-bl-xl
            shadow-[rgba(0,0,15,0.5)_10px_10px_10px_10px]
            w-full md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]
            ${!isOpen ? "translate-x-full" : "translate-x-0"}
            `}
        >
            <div className="w-full h-full">
                <div className="overflow-auto h-full">
                    <div className="flex flex-col gap-4 mx-4 pb-4 pt-4">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="capitalize text-xl text-gray-600 dark:text-gray-300 cursor-default">Pokedex</h1>
                            <CloseModalButton />
                        </div>
                        <MenuModalContainerComponent
                            title="achievements"
                            isOpen={achievementsVisible}
                            toggleContainer={() => setAchievementsVisible(!achievementsVisible)}
                        >
                            <AchievementsComponent />
                        </MenuModalContainerComponent>
                        <MenuModalContainerComponent
                            title="settings"
                            isOpen={settingsVisible}
                            toggleContainer={() => setSettingsVisible(!settingsVisible)}
                        >
                            <SettingsComponent />
                        </MenuModalContainerComponent>
                        <MenuModalContainerComponent
                            title="Theme"
                            isOpen={themeVisible}
                            toggleContainer={() => setThemeVisible(!themeVisible)}

                        >
                            <ThemeComponent />
                        </MenuModalContainerComponent>
                        <MenuModalContainerComponent
                            title="Support"
                            isOpen={supportVisible}
                            toggleContainer={() => setSupportVisible(!supportVisible)}
                        >
                            <SupportComponent />
                        </MenuModalContainerComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}
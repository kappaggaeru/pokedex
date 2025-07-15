import CloseModalButton from "../../buttons/close-modal.button"
import { CookiesComponent } from "./cookies.component";
import { SupportComponent } from "./support.component";
import { ThemeComponent } from "./theme.component";
import { useState } from "react";
import { MenuModalContainerComponent } from "./menu-modal-container.component";
import { LanguageComponent } from "./language.component";
import Image from "next/image";
import { AccesibilityComponent } from "./accesibility.component";
import AchievementsComponent from "./achievements.component";
import { useAchievements } from "@/app/context/achievementsContext";

export const ModalComponent = ({ isOpen }: { isOpen: boolean }) => {
    const [achievementsVisible, setAchievementsVisible] = useState(false);
    const [languageVisible, setLanguageVisible] = useState(false);
    const [accesibilityVisible, setAccesibilityVisible] = useState(false);
    const [cookiesVisible, setCookiesVisible] = useState(false);
    const [supportVisible, setSupportVisible] = useState(false);
    const [themeVisible, setThemeVisible] = useState(false);
    const { achievements } = useAchievements();

    const completedAchievements = achievements.filter(element => element.completed).length;
    const achievementsSubtitle = `(${completedAchievements} / ${achievements.length})`;

    return (
        <div className={`
            fixed top-0 bottom-0 right-0 h-screen
            transition-all duration-300 z-50
            text-black dark:text-gray-300
            bg-white/50 dark:bg-slate-800/50 backdrop-blur-md
            md:border-l border-gray-200/50 dark:border-gray-600/50
            md:rounded-tl-xl md:rounded-bl-xl
            w-full sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]
            ${!isOpen ? "translate-x-full shadow-none" : "translate-x-0 shadow-[rgba(0,0,15,0.5)_10px_10px_10px_10px]"}
            `}
        >
            <div className="w-full h-full">
                <div className="overflow-auto h-full">
                    <div className="flex flex-col gap-4 mx-4 pb-4 pt-4">
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9dex" target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src="/assets/images/pokedex_logo.png"
                                        alt="pokedex logo"
                                        className="h-[4rem] max-w-[10rem] aspect-[16/9] object-contain"
                                        width={100}
                                        height={50}
                                    />
                                </a>
                            </div>
                            <CloseModalButton />
                        </div>
                        <MenuModalContainerComponent
                            title="achievements"
                            subtitle={achievementsSubtitle}
                            isOpen={achievementsVisible}
                            toggleContainer={() => setAchievementsVisible(!achievementsVisible)}
                        >
                            <AchievementsComponent />
                        </MenuModalContainerComponent>
                        <MenuModalContainerComponent
                            title="language"
                            isOpen={languageVisible}
                            toggleContainer={() => setLanguageVisible(!languageVisible)}
                        >
                            <LanguageComponent />
                        </MenuModalContainerComponent>
                        <MenuModalContainerComponent
                            title="accesibility"
                            isOpen={accesibilityVisible}
                            toggleContainer={() => setAccesibilityVisible(!accesibilityVisible)}
                        >
                            <AccesibilityComponent />
                        </MenuModalContainerComponent>
                        <MenuModalContainerComponent
                            title="cookies"
                            isOpen={cookiesVisible}
                            toggleContainer={() => setCookiesVisible(!cookiesVisible)}
                        >
                            <CookiesComponent />
                        </MenuModalContainerComponent>
                        <MenuModalContainerComponent
                            title="Theme"
                            isOpen={themeVisible}
                            toggleContainer={() => setThemeVisible(!themeVisible)}

                        >
                            <ThemeComponent />
                        </MenuModalContainerComponent>
                        <div className="mb-20 md:mb-0">
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
        </div>
    )
}
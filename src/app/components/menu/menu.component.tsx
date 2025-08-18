import CloseMenuButton from "../../buttons/close-menu.button"
import { CookiesComponent } from "./cookies.component";
import { SupportComponent } from "./support.component";
import { ThemeComponent } from "./theme.component";
import { useEffect, useState } from "react";
import { MenuContainerComponent } from "./menu-container.component";
import { LanguageComponent } from "./language.component";
import Image from "next/image";
import { AccesibilityComponent } from "./accesibility.component";
import AchievementsComponent from "./achievements.component";
import { useAchievements } from "@/app/context/achievementsContext";
import { useMenu } from "@/app/context/menuContext";
import { FaqComponent } from "./faq.component";

export const MenuComponent = ({ isOpen }: { isOpen: boolean }) => {
    const [achievementsVisible, setAchievementsVisible] = useState(false);
    const [languageVisible, setLanguageVisible] = useState(false);
    const [accesibilityVisible, setAccesibilityVisible] = useState(false);
    const [cookiesVisible, setCookiesVisible] = useState(false);
    const [themeVisible, setThemeVisible] = useState(false);
    const [faqVisible, setFaqVisible] = useState(false);
    const [supportVisible, setSupportVisible] = useState(false);
    const { achievements } = useAchievements();
    const {activeSector} = useMenu();

    const completedAchievements = achievements.filter(element => element.completed).length;
    const achievementsSubtitle = `(${completedAchievements} / ${achievements.length})`;

    useEffect(() => {
        if (activeSector !== "") {
            setAchievementsVisible(false);
            setLanguageVisible(false);
            setAccesibilityVisible(false);
            setCookiesVisible(false);
            setThemeVisible(false);
            setSupportVisible(false);
            setFaqVisible(false);

            switch (activeSector) {
                case "achievements":
                    setAchievementsVisible(true); break;
                case "settings":
                    setLanguageVisible(true);
                    setAccesibilityVisible(true);
                    setCookiesVisible(true);
                    break;
                case "theme":
                    setThemeVisible(true); break;
                case "faq":
                    setFaqVisible(true); break;
                case "support":
                    setSupportVisible(true); break;
            }
        }
    }, [activeSector])

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
                                        className="h-auto w-auto max-w-[5rem] aspect-[16/9] object-contain"
                                        width={75}
                                        height={30}
                                    />
                                </a>
                            </div>
                            <CloseMenuButton />
                        </div>
                        <MenuContainerComponent
                            title="achievements"
                            subtitle={achievementsSubtitle}
                            isOpen={achievementsVisible}
                            toggleContainer={() => setAchievementsVisible(!achievementsVisible)}
                        >
                            <AchievementsComponent />
                        </MenuContainerComponent>
                        <MenuContainerComponent
                            title="language"
                            isOpen={languageVisible}
                            toggleContainer={() => setLanguageVisible(!languageVisible)}
                        >
                            <LanguageComponent />
                        </MenuContainerComponent>
                        <MenuContainerComponent
                            title="accesibility"
                            isOpen={accesibilityVisible}
                            toggleContainer={() => setAccesibilityVisible(!accesibilityVisible)}
                        >
                            <AccesibilityComponent />
                        </MenuContainerComponent>
                        <MenuContainerComponent
                            title="cookies"
                            isOpen={cookiesVisible}
                            toggleContainer={() => setCookiesVisible(!cookiesVisible)}
                        >
                            <CookiesComponent />
                        </MenuContainerComponent>
                        <MenuContainerComponent
                            title="Theme"
                            isOpen={themeVisible}
                            toggleContainer={() => setThemeVisible(!themeVisible)}

                        >
                            <ThemeComponent />
                        </MenuContainerComponent>
                        <MenuContainerComponent
                            title="FAQ"
                            isOpen={faqVisible}
                            toggleContainer={() => setFaqVisible(!faqVisible)}
                        >
                            <FaqComponent />
                        </MenuContainerComponent>
                        <div className="mb-20 md:mb-0">
                            <MenuContainerComponent
                                title="Support"
                                isOpen={supportVisible}
                                toggleContainer={() => setSupportVisible(!supportVisible)}
                            >
                                <SupportComponent />
                            </MenuContainerComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
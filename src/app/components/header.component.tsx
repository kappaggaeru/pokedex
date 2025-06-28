import AchievementsButton from "../buttons/achievement.button";
import MenuButton from "../buttons/menu.button";
import SettingsButton from "../buttons/settings.button";
import SupportButton from "../buttons/support.button";
import ToggleThemeButton from "../buttons/toggle-theme.button";
import { useMenu } from "../context/menuContext";
import MenuComponent from "./menu.component";
import SearchBarComponent from "./nav/search-bar.component";

const HeaderComponent: React.FC = () => {
    const { showMenu } = useMenu();
    return (
        <div className={`
            fixed top-0 py-4 left-1/2 transform -translate-x-1/2 z-50
            w-full max-w-4xl
            ${showMenu ? "bg-white/50 dark:bg-slate-800/80 backdrop-blur-md" : ""}
            `}>
            <div className={`
                flex flex-row gap-4 items-center px-4
                `}>
                <div className="w-full">
                    <SearchBarComponent />
                </div>
                <div className="hidden md:block">
                    <AchievementsButton />
                </div>
                <div className="hidden md:block">
                    <SettingsButton />
                </div>
                <div className="hidden md:block">
                    <SupportButton />
                </div>
                <div className="hidden md:block">
                    <ToggleThemeButton />
                </div>
                <div className="md:hidden">
                    <MenuButton />
                </div>
            </div >

            {showMenu && (
                <div className={`${showMenu ? "block" : "hidden"}`}>
                    <MenuComponent isOpen={showMenu} />
                </div>
            )
            }
        </div>
    );
}
export default HeaderComponent;
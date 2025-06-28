import AchievementsButton from "../buttons/achievement.button";
import MenuButton from "../buttons/menu.button";
import SettingsButton from "../buttons/settings.button";
import SupportButton from "../buttons/support.button";
import ToggleThemeButton from "../buttons/toggle-theme.button";
import { useMenu } from "../context/menuContext";
import MenuComponent from "./menu.component";
import SearchBarComponent from "./nav/search-bar.component";

const HeaderComponent: React.FC = () => {
    const { showMenu, toggleMenu } = useMenu();
    return (
        <div>
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
                    <MenuComponent isOpen={showMenu} onClose={toggleMenu} />
                </div>
            )
            }
        </div>
    );
}
export default HeaderComponent;
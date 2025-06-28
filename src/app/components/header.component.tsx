import AchievementsButton from "../buttons/achievement.button";
import MenuButton from "../buttons/menu.button";
import SettingsButton from "../buttons/settings.button";
import SupportButton from "../buttons/support.button";
import ToggleThemeButton from "../buttons/toggle-theme.button";
import SearchBarComponent from "./nav/search-bar.component";

const HeaderComponent: React.FC = () => {
    return (
        <div className={`
                flex flex-row gap-4 items-center
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
    );
}
export default HeaderComponent;
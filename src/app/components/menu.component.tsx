import AchievementsButton from "../buttons/achievement.button";
import SettingsButton from "../buttons/settings.button";
import SupportButton from "../buttons/support.button";
import ThemeButton from "../buttons/theme.button";
import ToggleThemeButton from "../buttons/toggle-theme.button";

const MenuComponent: React.FC = () => {

    return (
        <div className="w-full h-screen pt-20">
            <div className="flex flex-col gap-8 ">
                <div className="flex flex-col justify-center gap-4 px-4">
                    <div className="w-full flex justify-center">
                        <AchievementsButton />
                    </div>
                    <div className="w-full flex justify-center">
                        <SettingsButton />
                    </div>
                    <div className="w-full flex justify-center">
                        <SupportButton />
                    </div>
                    <div className="w-full flex justify-center">
                        <ThemeButton />
                    </div>
                    <div className="w-full flex justify-center">
                        <ToggleThemeButton />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col text-center text-gray-600 dark:text-gray-400">
                        <p>Report an issue</p>
                        <p>Source code</p>
                        <p>PokéApi</p>
                        <p>Made by Lautaro Olivera</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default MenuComponent;
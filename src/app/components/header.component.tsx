import { Coffee, Menu, Search, Settings, SunMoon, Trophy } from "lucide-react";
import MenuTriggerButton from "../buttons/menu-trigger.button";
import DefaultButton from "../buttons/default.button";
import { useModal } from "../context/modalContext";
import { useTheme } from "../context/themeContext";

const HeaderComponent: React.FC = () => {
    const { toggleModal } = useModal();
    const { toggleThemeLightAndDark } = useTheme();

    return (
        <div className="fixed top-0 py-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl">
            <div className="flex flex-row gap-4 items-center px-4 justify-end md:justify-center">
                <div>
                    <DefaultButton isVisible={true} title="Search" icon={Search} onClick={toggleModal}/>
                </div>
                <div className="md:hidden">
                    <DefaultButton isVisible={true} icon={SunMoon} onClick={toggleThemeLightAndDark}/>
                </div>
                <div className="hidden md:block">
                    <MenuTriggerButton menu="achievements" title="Achievements" icon={Trophy} />
                </div>
                <div className="hidden md:block">
                    <MenuTriggerButton menu="settings" title="Settings" icon={Settings} />
                </div>
                <div className="hidden lg:block">
                    <MenuTriggerButton menu="theme" title="Theme" icon={SunMoon} />
                </div>
                <div className="hidden xl:block">
                    <MenuTriggerButton menu="support" title="Support" icon={Coffee} />
                </div>
                <div className="md:hidden">
                    <MenuTriggerButton menu="" title="" icon={Menu} />
                </div>
            </div >
        </div>
    );
}
export default HeaderComponent;
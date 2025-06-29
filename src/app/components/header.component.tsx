import { Coffee, Settings, SunMoon, Trophy } from "lucide-react";
import MenuButton from "../buttons/menu.button";
import ModalTriggerButton from "../buttons/modal-trigger.button";
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
                    <ModalTriggerButton modal="achievements" title="Achievements" icon={Trophy} enabled={false} />
                </div>
                <div className="hidden md:block">
                    <ModalTriggerButton modal="settings" title="Settings" icon={Settings} enabled={false} />
                </div>
                <div className="hidden md:block">
                    <ModalTriggerButton modal="support" title="Support" icon={Coffee} enabled={false} />
                </div>
                <div className="hidden md:block">
                    <ModalTriggerButton modal="theme" title="Theme" icon={SunMoon} enabled={true} />
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
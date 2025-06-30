import { Coffee, Menu, Settings, SunMoon, Trophy } from "lucide-react";
import ModalTriggerButton from "../buttons/modal-trigger.button";
import SearchBarComponent from "./nav/search-bar.component";

const HeaderComponent: React.FC = () => {

    return (
        <div className="fixed top-0 py-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl">
            <div className="flex flex-row gap-4 items-center px-4">
                <div className="w-full">
                    <SearchBarComponent />
                </div>
                <div className="hidden md:block">
                    <ModalTriggerButton modal="achievements" title="Achievements" icon={Trophy} />
                </div>
                <div className="hidden md:block">
                    <ModalTriggerButton modal="settings" title="Settings" icon={Settings} />
                </div>
                <div className="hidden md:block">
                    <ModalTriggerButton modal="theme" title="Theme" icon={SunMoon} />
                </div>
                <div className="hidden md:block">
                    <ModalTriggerButton modal="support" title="Support" icon={Coffee} />
                </div>
                <div className="md:hidden">
                    <ModalTriggerButton modal="" title="" icon={Menu} />
                </div>
            </div >
        </div>
    );
}
export default HeaderComponent;
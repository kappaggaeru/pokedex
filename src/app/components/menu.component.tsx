import { useEffect } from "react";
import ModalTriggerButton from "../buttons/modal-trigger.button";
import { Coffee, Settings, SunMoon, Trophy } from "lucide-react";

export const MenuComponent = ({ isOpen }: { isOpen: boolean }) => {

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <div className="h-screen pt-4 md:hidden">
            <div className="flex flex-col gap-8 ">
                <div className="flex flex-col justify-center gap-4 px-4">
                    <div className="w-full flex justify-center">
                        <ModalTriggerButton modal="achievements" title="Achievements" icon={Trophy} />
                    </div>
                    <div className="w-full flex justify-center">
                        <ModalTriggerButton modal="settings" title="Settings" icon={Settings} />
                    </div>
                    <div className="w-full flex justify-center">
                        <ModalTriggerButton modal="support" title="Support" icon={Coffee} />
                    </div>
                    <div className="w-full flex justify-center">
                        <ModalTriggerButton modal="theme" title="Theme" icon={SunMoon} />
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
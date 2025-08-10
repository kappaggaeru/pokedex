import { LucideIcon } from "lucide-react";
import DefaultButton from "./default.button";
import { useMenu } from "../context/menuContext";

const MenuTriggerButton = ({ title, icon, menu }: { menu: string; title: string, icon: LucideIcon }) => {
    const { toggleMenu } = useMenu();
    function triggerMenu() {
        toggleMenu(menu);
    }

    return (
        <DefaultButton onClick={triggerMenu} isVisible={true} icon={icon} title={title} />
    );
}
export default MenuTriggerButton;
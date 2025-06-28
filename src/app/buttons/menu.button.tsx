import { Menu, X } from "lucide-react";
import DefaultButton from "./default.button";
import { useMenu } from "../context/menuContext";

const MenuButton = () => {
    const { showMenu, toggleMenu } = useMenu();

    return (
        <DefaultButton onClick={toggleMenu} isVisible={true} icon={showMenu ? X : Menu}/>
    );
}
export default MenuButton;
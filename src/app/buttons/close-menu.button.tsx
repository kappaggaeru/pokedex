import { X } from "lucide-react";
import DefaultButton from "./default.button";
import { useMenu } from "../context/menuContext";

const CloseMenuButton = () => {
    const { toggleMenu } = useMenu();

    return (
        <DefaultButton onClick={toggleMenu} isVisible={true} icon={X}/>
    );
}
export default CloseMenuButton;
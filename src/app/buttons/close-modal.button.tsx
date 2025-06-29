import { X } from "lucide-react";
import DefaultButton from "./default.button";
import { useModal } from "../context/modalContext";

const CloseModalButton = () => {
    const { toggleModal } = useModal();

    return (
        <DefaultButton onClick={toggleModal} isVisible={true} icon={X}/>
    );
}
export default CloseModalButton;
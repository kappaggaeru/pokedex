import { LucideIcon } from "lucide-react";
import DefaultButton from "./default.button";
import { useModal } from "../context/modalContext";

const ModalTriggerButton = ({ modal, title, icon}: { modal: string; title: string, icon: LucideIcon}) => {
    const { toggleModal, setActiveModal } = useModal();
    function triggerModal () {
        setActiveModal(modal);
        toggleModal();
    }
    
    return (
        <DefaultButton onClick={triggerModal} isVisible={true} icon={icon} title={title}/>
    );
}
export default ModalTriggerButton;
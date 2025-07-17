import { LucideIcon } from "lucide-react";
import DefaultButton from "./default.button";
import { useModal } from "../context/modalContext";

const ModalTriggerButton = ({ title, icon, modal }: { modal: string; title: string, icon: LucideIcon }) => {
    const { toggleModal } = useModal();
    function triggerModal() {
        toggleModal(modal);
    }

    return (
        <DefaultButton onClick={triggerModal} isVisible={true} icon={icon} title={title} />
    );
}
export default ModalTriggerButton;
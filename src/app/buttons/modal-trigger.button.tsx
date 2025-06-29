import { LucideIcon } from "lucide-react";
import DefaultButton from "./default.button";
import { useModal } from "../context/modalContext";

const ModalTriggerButton = ({ modal, title, icon, enabled }: { modal: string; title: string, icon: LucideIcon, enabled: boolean }) => {
    const { toggleModal, setActiveModal } = useModal();
    function triggerModal() {
        if (enabled) {
            setActiveModal(modal);
            toggleModal();
        }
    }

    return (
        <DefaultButton onClick={triggerModal} isVisible={true} icon={icon} title={title} />
    );
}
export default ModalTriggerButton;
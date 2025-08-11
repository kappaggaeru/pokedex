import { Search } from "lucide-react"
import DefaultButton from "./default.button"
import { useModal } from "../context/modalContext"

const ToggleModalButton = () => {
    const { toggleModal } = useModal();

    return (
        <DefaultButton icon={Search} onClick={toggleModal} title="Search" altText="Ctrl K"/>
    )
}
export default ToggleModalButton;
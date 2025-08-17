import DefaultButton from "@/app/buttons/default.button";
import { useModal } from "@/app/context/modalContext";
import { Expand } from "lucide-react";

export function ExpandArtworkComponent() {
    const { toggleModalArtwork } = useModal();

    return (
        <DefaultButton icon={Expand} onClick={toggleModalArtwork} />
    )
}
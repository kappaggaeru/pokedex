import DefaultButton from "@/app/buttons/default.button";
import { Sparkle } from "lucide-react";

type Props = {
    onClick: () => void;
}

export const ShineComponent: React.FC<Props> = ({ onClick }) => {
    return (
        <DefaultButton
            icon={Sparkle}
            onClick={onClick}
            isVisible={true}
        />
    );
}
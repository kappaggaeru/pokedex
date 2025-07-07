import DefaultButton from "@/app/buttons/default.button";
import { Sparkle } from "lucide-react";

export const ShineComponent: React.FC = () => {
    return (
        <DefaultButton
            icon={Sparkle}
            onClick={() => {}}
            isVisible={true}
        />
    );
}
import { Coffee } from "lucide-react";
import DefaultButton from "./default.button";

const SupportButton = () => {
    function toggleSupport() {
        console.log('toggleSupport');
    }
    return (
        <DefaultButton onClick={toggleSupport} isVisible={true} icon={Coffee} title="Support"/>
    );
}
export default SupportButton;
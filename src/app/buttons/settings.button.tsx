import { Settings } from "lucide-react";
import DefaultButton from "./default.button";

const SettingsButton = () => {
    function toggleSettings() {
        console.log('toggleSettings');
    }
    return (
        <DefaultButton onClick={toggleSettings} isVisible={true} icon={Settings} title="Settings"/>
    );
}
export default SettingsButton;
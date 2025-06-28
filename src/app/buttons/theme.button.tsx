import { SunMoon } from "lucide-react";
import DefaultButton from "./default.button";

const ThemeButton = () => {
    function toggleTheme() {
        console.log('toggleTheme');
    }
    return (
        <DefaultButton onClick={toggleTheme} isVisible={true} icon={SunMoon} title="Theme"/>
    );
}
export default ThemeButton;
import { Trophy } from "lucide-react";
import DefaultButton from "./default.button";

const AchievementsButton = () => {
    function toggleAchievements() {
        console.log('toggleAchievements');
    }
    return (
        <DefaultButton onClick={toggleAchievements} isVisible={true} icon={Trophy} title="Achievements"/>
    );
}
export default AchievementsButton;
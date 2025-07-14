import { useAchievements } from "@/app/context/achievementsContext";
import { AchievementCardComponent } from "../card/achievement-card.component"

const AchievementsComponent: React.FC = () => {
    const { achievements } = useAchievements();

    const fullEntries =
        achievements.map((entry, index) => (
            <AchievementCardComponent
                key={index}
                title={entry.title}
                desc={entry.description}
                goal={entry.goal}
                onClick={() => {}}
            />
        ));

    return (
        <div>
            <div className="flex flex-col gap-6">
                {fullEntries}
            </div>
        </div>
    );
}
export default AchievementsComponent;
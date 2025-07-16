import { useAchievements } from "@/app/context/achievementsContext";
import { AchievementCardComponent } from "../card/achievement-card.component"

const AchievementsComponent: React.FC = () => {
    const { achievements } = useAchievements();

    const fullEntries = achievements.map((entry) => (
        <AchievementCardComponent
            key={entry.id}
            title={entry.title}
            desc={entry.description}
            goal={entry.goal}
            isCompleted={entry.completed}
            completedAt={entry.completedAt}
            onClick={() => { }}
        />
    ));

    return (
        <div className="flex flex-col gap-4">
            {fullEntries}
        </div>
    );
}

export default AchievementsComponent;
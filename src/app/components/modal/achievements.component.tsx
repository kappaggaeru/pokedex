import { useAchievements } from "@/app/context/achievementsContext";
import { AchievementCardComponent } from "../card/achievement-card.component"

const AchievementsComponent: React.FC = () => {
    const { achievements } = useAchievements();

    const fullEntries = achievements.map((entry) => (
        <AchievementCardComponent
            key={entry.id} // Mejor usar el id como key en lugar del index
            title={entry.title}
            desc={entry.description} // Noté que en tu tipo es "description", no "desc"
            goal={entry.goal}
            isCompleted={entry.completed} // Aquí usas la propiedad "completed"
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
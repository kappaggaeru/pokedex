import { useAchievements } from "@/app/context/achievementsContext";
import { AchievementCardComponent } from "../card/achievement-card.component"
import { Lock } from "lucide-react";

const AchievementsComponent: React.FC = () => {
    const { achievements } = useAchievements();

    const fullEntries = achievements.map((entry) => (
        <AchievementCardComponent
            key={entry.id}
            title={entry.title}
            desc={entry.description}
            goal={entry.goal}
            image={entry.image ?? ""}
            icon={entry.icon ?? Lock}
            type={entry.type}
            isSpecial={entry.hasCookie !== undefined}
            isNotification={false}
            isCompleted={entry.completed}
            completedAt={entry.completedAt ?? undefined}
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
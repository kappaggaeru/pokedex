import { ReactNode } from "react";
import { AchievementCardComponent } from "../card/achievement-card.component"

type achievementModel = {
    title: string;
    description: string;
    goal: number;
}

const entries: achievementModel[] = [
    {
        title: "Caught first Pokémon",
        description: "You catched your first pokémon",
        goal: 1
    },
    {
        title: "Caught 10 Pokémons",
        description: "You catched 10 pokémons",
        goal: 10
    },
    {
        title: "Caught 25 Pokémons",
        description: "You catched 25 pokémons",
        goal: 25
    },
    {
        title: "Caught 50 Pokémons",
        description: "You catched 50 pokémons",
        goal: 50
    },
    {
        title: "Caught 100 Pokémons",
        description: "You catched 100 pokémons",
        goal: 100
    },
    {
        title: "Caught 500 Pokémons",
        description: "You catched 500 pokémons",
        goal: 500
    },
    {
        title: "Caught a legendary Pokémons",
        description: "You catched a legendary pokémon",
        goal: 1
    },
    {
        title: "Caught a mythical Pokémons",
        description: "You catched a mythical pokémon",
        goal: 1
    },
    {
        title: "Evolve one Pokémon",
        description: "You made a Pokémon evolve",
        goal: 1
    },
];

const fullEntries =
    entries.map((entry, index) => (
        <AchievementCardComponent key={index} title={entry.title} desc={entry.description} goal={entry.goal}/>
    ));
export const AchievementsComponent: ReactNode = (
        <div>
            <div className="flex flex-col gap-6">
                {fullEntries}
            </div>
        </div>
)
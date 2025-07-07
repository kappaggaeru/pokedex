import { AchievementCardComponent } from "../card/achievement-card.component"

type achievementModel = {
    title: string;
    description: string;
    goal: number;
}

const entries: achievementModel[] = [
    {
        title: "Caught First Pokémon",
        description: "You caught your first Pokémon.",
        goal: 1
    },
    {
        title: "Caught 10 Pokémon",
        description: "You caught 10 Pokémon.",
        goal: 10
    },
    {
        title: "Caught 25 Pokémon",
        description: "You caught 25 Pokémon.",
        goal: 25
    },
    {
        title: "Caught 50 Pokémon",
        description: "You caught 50 Pokémon.",
        goal: 50
    },
    {
        title: "Caught 100 Pokémon",
        description: "You caught 100 Pokémon.",
        goal: 100
    },
    {
        title: "Caught 500 Pokémon",
        description: "You caught 500 Pokémon.",
        goal: 500
    },
    {
        title: "Caught a Legendary Pokémon",
        description: "You caught your first Legendary Pokémon.",
        goal: 1
    },
    {
        title: "Caught a Mythical Pokémon",
        description: "You caught your first Mythical Pokémon.",
        goal: 1
    },
    {
        title: "I choose you!",
        description: "You discovered a Pokémon's roar.",
        goal: 1
    },
    {
        title: "Make it Shine!",
        description: "You discovered a shiny Pokémon.",
        goal: 1
    },
    {
        title: "Evolution Complete",
        description: "You evolved a Pokémon for the first time.",
        goal: 1
    },
    {
        title: "Gotta Catch 'Em All!",
        description: "You caught all available Pokémon.",
        goal: 1025
    },
    {
        title: "Ketchup",
        description: "You caught all of Ash's Pokémon.",
        goal: 50
    },
    {
        title: "Found a Variant",
        description: "You discovered a Pokémon variant.",
        goal: 1
    },
    {
        title: "Evolution Chain Master",
        description: "You completed an entire evolution chain.",
        goal: 1
    },
    {
        title: "Retro Mode Unlocked",
        description: "You unlocked Retro Mode.",
        goal: 1
    }
];


const fullEntries =
    entries.map((entry, index) => (
        <AchievementCardComponent key={index} title={entry.title} desc={entry.description} goal={entry.goal} />
    ));

export const AchievementsComponent: React.FC = () => (
    <div>
        <div className="flex flex-col gap-6">
            {fullEntries}
        </div>
    </div>
)
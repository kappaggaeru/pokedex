import { EvolutionTrigger } from "@/app/models/evolution-trigger.model";
import { TriggerCard } from "./trigger-card.component";
import { Generic } from "@/app/models/dto/generic.model";

type Props = {
    evolutionChain: EvolutionTrigger[];
}

type MergedEvolution = {
    evolvesFrom: string;
    evolvesTo: string;
    triggers: {
        trigger: string;
        min_level: number | null;
        min_happiness: number;
        min_affection: number;
        daytime: string;
        items: Generic[];
        locations: Generic[];
        knowTypeMove: Generic | null;
    }[];
};

const EvolutionTriggers: React.FC<Props> = ({ evolutionChain }) => {

    const mergeEvolutions = (data: EvolutionTrigger[]): MergedEvolution[] => {
        const map = new Map<string, MergedEvolution>();

        for (const evo of data) {
            if (!map.has(evo.evolvesTo)) {
                map.set(evo.evolvesTo, {
                    evolvesFrom: evo.evolvesFrom,
                    evolvesTo: evo.evolvesTo,
                    triggers: [
                        {
                            trigger: evo.trigger,
                            min_level: evo.min_level,
                            min_happiness: evo.min_happiness,
                            min_affection: evo.min_affection,
                            daytime: evo.daytime,
                            items: [],
                            locations: [],
                            knowTypeMove: evo.known_move_type
                                ? {
                                    name: evo.known_move_type.name,
                                    url: evo.known_move_type.url
                                }
                                : null
                        }
                    ],
                });
            }

            const entry = map.get(evo.evolvesTo)!;
            const triggerGroup = entry.triggers[0];

            triggerGroup.min_happiness = triggerGroup.min_happiness || evo.min_happiness || 0;
            triggerGroup.min_affection = triggerGroup.min_affection || evo.min_affection || 0;
            triggerGroup.min_level = triggerGroup.min_level || evo.min_level || 0;

            if (!triggerGroup.knowTypeMove && evo.known_move_type) {
                triggerGroup.knowTypeMove = evo.known_move_type;
            }

            if (triggerGroup.trigger !== evo.trigger) {
                triggerGroup.trigger = "mixed";
            }

            if (evo.item) {
                if (!triggerGroup.items.some(i => i.name === evo.item!.name)) {
                    triggerGroup.items.push(evo.item);
                }
            }

            if (evo.location && evo.location !== null && typeof evo.location !== "string" && (evo.location as Generic).name) {
                if (
                    evo.location &&
                    typeof evo.location !== "string" &&
                    !triggerGroup.locations.some(l => l.name === (evo.location as Generic).name)
                ) {
                    triggerGroup.locations.push(evo.location as Generic);
                }
            }
        }

        return Array.from(map.values());
    };


    const formattedTriggers = mergeEvolutions(evolutionChain);

    const evolutionTriggers = formattedTriggers.flatMap((merged, index) => {
        return merged.triggers.map((t, subIndex) => (
            <TriggerCard
                key={`poke-${index}-${subIndex}`}
                evolvesTo={merged.evolvesTo}
                level={t.min_level ?? 0}
                trigger={t.trigger ?? ""}
                item={t.items[0] ?? null}
                minHappiness={t.min_happiness}
                minAffection={t.min_affection}
                daytime={t.daytime ?? ""}
                location={t.locations.length > 0 ? t.locations.map(l => l.name).filter((name): name is string => typeof name === "string") : []}
                knownTypeMove={t.knowTypeMove}
            />
        ));
    });

    console.log(formattedTriggers);

    return (
        <div className="flex flex-col gap-4">
            {evolutionTriggers}
        </div>
    )
}
export default EvolutionTriggers;
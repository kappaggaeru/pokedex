import { EvolutionTrigger } from "@/app/models/evolution-trigger.model";
import { TriggerCard } from "./trigger-card.component";
import { Generic } from "@/app/models/dto/generic.model";

type Props = {
    evolutionChain: EvolutionTrigger[];
}

type MergedEvolution = {
    babyTriggerItem: Generic | null;
    evolvesFrom: string;
    evolvesTo: string;
    triggers: {
        trigger: string;
        babyTriggerItem: Generic | null;
        minLevel: number | null;
        minHappiness: number;
        minAffection: number;
        daytime: string;
        items: Generic[];
        heldItem: Generic | null;
        locations: Generic[];
        knowTypeMove: Generic | null;
        knowMove: Generic | null;
        partySpecies: Generic | null;
    }[];
};

const EvolutionTriggers: React.FC<Props> = ({ evolutionChain }) => {

    const mergeEvolutions = (data: EvolutionTrigger[]): MergedEvolution[] => {
        const map = new Map<string, MergedEvolution>();

        for (const evo of data) {
            if (!map.has(evo.evolvesTo)) {
                map.set(evo.evolvesTo, {
                    babyTriggerItem: evo.babyTriggerItem,
                    evolvesFrom: evo.evolvesFrom,
                    evolvesTo: evo.evolvesTo,
                    triggers: [
                        {
                            trigger: evo.trigger,
                            babyTriggerItem: evo.babyTriggerItem,
                            minLevel: evo.minLevel,
                            minHappiness: evo.minHappiness,
                            minAffection: evo.minAffection,
                            daytime: evo.daytime,
                            items: [],
                            heldItem: evo.heldItem
                                ? {
                                    name: evo.heldItem.name,
                                    url: evo.heldItem.url
                                }
                                : null,
                            locations: [],
                            knowTypeMove: evo.knownMoveType
                                ? {
                                    name: evo.knownMoveType.name,
                                    url: evo.knownMoveType.url
                                }
                                : null,
                            knowMove: evo.knowMove
                                ? {
                                    name: evo.knowMove.name,
                                    url: evo.knowMove.url
                                }
                                : null,
                            partySpecies: evo.partySpecies
                                ? {
                                    name: evo.partySpecies.name,
                                    url: evo.partySpecies.url
                                }
                                : null
                        }
                    ],
                });
            }

            const entry = map.get(evo.evolvesTo)!;
            const triggerGroup = entry.triggers[0];

            triggerGroup.minHappiness = triggerGroup.minHappiness || evo.minHappiness || 0;
            triggerGroup.minAffection = triggerGroup.minAffection || evo.minAffection || 0;
            triggerGroup.minLevel = triggerGroup.minLevel || evo.minLevel || 0;

            if (!triggerGroup.knowTypeMove && evo.knownMoveType) {
                triggerGroup.knowTypeMove = evo.knownMoveType;
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
                babyTriggerItem={t.babyTriggerItem}
                evolvesTo={merged.evolvesTo}
                level={t.minLevel ?? 0}
                trigger={t.trigger ?? ""}
                item={t.items[0] ?? null}
                heldItem={t.heldItem}
                minHappiness={t.minHappiness}
                minAffection={t.minAffection}
                daytime={t.daytime ?? ""}
                location={t.locations.length > 0 ? t.locations.map(l => l.name).filter((name): name is string => typeof name === "string") : []}
                knownTypeMove={t.knowTypeMove}
                knownMove={t.knowMove}
                partySpecies={t.partySpecies}
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
import { Generic } from "./dto/generic.model";

export interface EvolutionTrigger {
    babyTriggerItem: Generic | null;
    evolvesFrom: string;
    evolvesTo: string;
    minLevel: number;
    trigger: string;
    item: Generic | null;
    daytime: string;
    minHappiness: number;
    minAffection: number;
    location: Generic | null;
    knownMoveType: Generic | null;
    knowMove: Generic | null;
    partySpecies: Generic | null;
}

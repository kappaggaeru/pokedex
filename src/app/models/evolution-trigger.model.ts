import { Generic } from "./dto/generic.model";

export interface EvolutionTrigger {
    evolvesFrom: string;
    evolvesTo: string;
    min_level: number;
    trigger: string;
    item: Generic | null;
    daytime: string;
    min_happiness: number;
    min_affection: number;
    location: Generic | null;
    known_move_type: Generic | null;
}
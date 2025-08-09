import { Generic } from "./generic.model";

export interface EvolutionDetail {
    gender: string | null,
    held_item: string | null,
    item: Generic,
    known_move: string | null,
    known_move_type: Generic | null,
    location: Generic | null,
    min_affection: string | null,
    min_beauty: string | null,
    min_happiness: string | null,
    min_level: number,
    needs_overworld_rain: boolean,
    party_species: string | null,
    party_type: string | null,
    relative_physical_stats: string | null,
    time_of_day: string,
    trade_species: string | null,
    trigger: Generic,
    turn_upside_down: boolean
}
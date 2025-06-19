import { Generic } from "./generic.model";

export interface EvolutionDetail {
    gender: string | null,
    held_item: string | null,
    item: string | null,
    known_move: string | null,
    known_move_type: string | null,
    location: string | null,
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
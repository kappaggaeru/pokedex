import { Ability } from "./ability.model";
import { Move } from "./move.model";
import { Stat } from "./stat.model";

export interface Pokemon {
    abilities: Ability[];
    name: string;
    height: number;
    moves: Move[];
    stats: Stat[];
    weight: number;
}
import { Ability } from "./ability.model";
import { Cries } from "./cries.model";
import { Item } from "./item.model";
import { Move } from "./move.model";
import { Stat } from "./stat.model";
import { Type } from "./type.model";

export interface Pokemon {
    id: number;
    abilities: Ability[];
    name: string;
    height: number;
    moves: Move[];
    stats: Stat[];
    weight: number;
    cries: Cries;
    types: Type[];
    held_items: Item[];
}
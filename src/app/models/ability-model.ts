import { Generic } from "./generic-model";

export interface Ability {
    ability: Generic;
    is_hidden: boolean;
    slot: number;
}
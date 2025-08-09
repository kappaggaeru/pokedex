import { Evolution } from "./evolution.model";
import { Generic } from "./generic.model";

export interface EvolutionChain {
    baby_trigger_item: Generic | null;
    chain: Evolution;
    id: number;
}
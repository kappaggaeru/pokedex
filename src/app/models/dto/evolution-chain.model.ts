import { Evolution } from "./evolution.model";

export interface EvolutionChain {
    baby_trigger_item: string;
    chain: Evolution;
    id: number;
}
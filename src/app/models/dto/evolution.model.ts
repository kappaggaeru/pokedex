import { EvolutionDetail } from "./evolution-detail.model";
import { Generic } from "./generic.model";

export interface Evolution {
    evolutionDetails: EvolutionDetail[];
    evolves_to: Evolution[];
    is_baby: boolean;
    species: Generic;
}
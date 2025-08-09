import { EvolutionDetail } from "./dto/evolution-detail.model";

export type EvolutionNode = {
    species: {
        name?: string;
        url?: string;
    };
    evolution_details?: EvolutionDetail[];
    evolves_to: EvolutionNode[];
};
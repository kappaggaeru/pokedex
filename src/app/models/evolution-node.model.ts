export type EvolutionNode = {
    species: {
        name?: string;
        url?: string;
    };
    evolves_to: EvolutionNode[];
};
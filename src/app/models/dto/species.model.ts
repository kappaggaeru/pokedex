import { Flavor } from "./flavor.model";
import { Generic } from "./generic.model";
import { Varieties } from "./varieties.model";

export interface Species {
    base_happiness: number;
    capture_rate: number;
    color: Generic;
    egg_groups: Generic[];
    evolution_chain: Generic;
    evolves_from_species: Generic;
    flavor_text_entries: Flavor[];
    habitat: Generic;
    id: number;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    shape: Generic;
    varieties: Varieties[];
}
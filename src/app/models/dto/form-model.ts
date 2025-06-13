import { Generic } from "./generic-model";
import { Type } from "./type-model";

export interface Form {
    name: string;
    pokemon: Generic;
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_shiny: string;
        front_shiny_female: string;
    };
    types: Type[];
    version_group: Generic;
}
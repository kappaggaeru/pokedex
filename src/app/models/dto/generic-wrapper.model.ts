import { Generic } from "./generic.model";

export interface GenericWrapper {
    count: number;
    next: string;
    previous: string;
    results: Generic[];
}
import { Cries } from "../dto/cries.model";

export type ArtworkContainerProps = {
    id: number;
    name: string;
    pokemonArtwork: string[];
    cries: Cries;
}
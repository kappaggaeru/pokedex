export type ArtworkContainerProps = {
    id: number;
    name: string;
    pokemonArtwork: string | null;
    clearCard: () => void;
}
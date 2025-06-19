export interface PokemonCardProps {
    id: number | null;
    clearCard: () => void;
    setIdFromParent: (id: number) => void;
}
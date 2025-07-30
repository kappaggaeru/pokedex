export type PokedexItemProps = {
    id: number;
    name?: string;
    sprite?: string;
    viewed?: boolean;
    loading: boolean;
    error: boolean;
    onSelect: (id: number) => void;
}
export type PokedexItemProps = {
    id: number;
    name?: string;
    sprite?: string;
    viewed?: boolean;
    onSelect: (id: number) => void;
}
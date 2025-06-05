export type PokedexItemProps = {
    id: number;
    sprite?: string;
    viewed?: boolean;
    onSelect: (id: number) => void;
}
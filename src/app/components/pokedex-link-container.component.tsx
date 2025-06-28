import { PokedexItemProps } from "../models/props/pokedex-item.props";

const PokedexLinkContainer: React.FC<PokedexItemProps> = ({ id, name, sprite, onSelect }) => {
    return (
        <div key={`stage-${id}`} className="text-center">
            <div
                onClick={() => onSelect(id)}
                className="cursor-pointer border bg-white dark:bg-slate-600 border-gray-200/50 dark:border-gray-600/50 flex flex-row items-center justify-center rounded-xl"
            >
                <img src={sprite} alt={`sprite_${name}`} className="w-20 h-20 object-contain flex items-center" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{name}</span>
        </div>
    );
}

export default PokedexLinkContainer;
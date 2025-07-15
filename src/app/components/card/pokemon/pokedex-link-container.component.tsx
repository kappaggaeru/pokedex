import Image from "next/image";
import { PokedexItemProps } from "../../../models/props/pokedex-item.props";

const PokedexLinkContainer: React.FC<PokedexItemProps> = ({ id, name, sprite, onSelect }) => {
    return (
        <div key={`stage-${id}`} className="text-center">
            <div
                onClick={() => onSelect(id)}
                className="cursor-pointer border 
                bg-slate-50 dark:bg-slate-700/70 
                border-gray-200/50 dark:border-gray-600/50
                flex flex-row items-center justify-center rounded-xl"
            >
                <Image
                    src={sprite ?? ''}
                    alt={`sprite_${name}`}
                    className="w-20 h-20 object-contain flex items-center"
                    width={20}
                    height={20}
                />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{name}</span>
        </div>
    );
}

export default PokedexLinkContainer;
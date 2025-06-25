import React from 'react';
import { PokedexItemProps } from '../models/props/pokedex-item.props';
import Image from 'next/image';

const PokedexItemContainer: React.FC<PokedexItemProps> = ({ id, sprite, viewed, onSelect }) => {
    return (
        <div
            className={`
                w-[4rem] h-[4rem] font-bold text-center content-center text-black dark:text-gray-300 rounded-lg 
                hover:cursor-pointer hover:scale-110 duration-300
                ${viewed ? 'bg-gray-200 dark:bg-gray-500' : 'bg-orange-100 dark:bg-slate-700'}`}
            onClick={() => onSelect(id)}
        >
            {viewed && sprite ? (
                <Image src={sprite} alt={`Pokemon ${id}`} className='w-full h-full object-contain' width={200} height={200} />
            ) : (
                <span>{id}</span>
            )}
        </div>

    );
}

export default PokedexItemContainer;
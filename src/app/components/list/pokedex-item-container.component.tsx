import React from 'react';
import { PokedexItemProps } from '../../models/props/pokedex-item.props';
import Image from 'next/image';
import { usePokemon } from '@/app/context/pokemonContext';

const PokedexItemContainer: React.FC<PokedexItemProps> = ({ id, sprite, viewed, loading }) => {
    const { selectPokemon } = usePokemon();

    const spinner = (
        <div className="w-6 h-6 m-auto rounded-full animate-spin
        border-2 border-gray-500 dark:border-gray-200 border-t-transparent dark:border-t-transparent" />
    );

    return (
        <div
            className={`
                w-[4rem] h-[4rem] font-bold text-center content-center text-black dark:text-gray-300 rounded-lg 
                hover:cursor-pointer hover:scale-110 duration-300
                ${viewed ? 'bg-gray-200 dark:bg-gray-500' : 'bg-orange-100 dark:bg-slate-700'}`}
            onClick={() => selectPokemon(id)}
        >
            {loading ? (
                spinner
            ) : sprite ? (
                <Image src={sprite} alt={`Pokemon ${id}`} className='w-full h-full object-contain' width={200} height={200} />
            ) : (
                <span>{id}</span>
            )}
        </div >
    );
}

export default PokedexItemContainer;
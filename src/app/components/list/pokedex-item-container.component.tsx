import React from 'react';
import { PokedexItemProps } from '../../models/props/pokedex-item.props';
import Image from 'next/image';
import { usePokemon } from '@/app/context/pokemonContext';
import { CloudAlert } from 'lucide-react';

const PokedexItemContainer: React.FC<PokedexItemProps> = ({ id, sprite, viewed, loading, error }) => {
    const { selectPokemon } = usePokemon();

    const spinner = (
        <div className="w-6 h-6 m-auto rounded-full animate-spin
        border-2 border-gray-500 dark:border-gray-200 border-t-transparent dark:border-t-transparent" />
    );

    return (
        <div
            className={`
                w-[4rem] h-[4rem] font-bold text-center content-center text-black dark:text-gray-300 rounded-lg 
                hover:cursor-pointer hover:scale-110 duration-300 relative group
                ${viewed ? 'bg-gray-200 dark:bg-gray-500' : 'bg-orange-100 dark:bg-slate-700'}
            `}
            onClick={() => selectPokemon(id)}
        >
            {loading ? (
                spinner
            )
            : error ? (
                <CloudAlert className='w-6 h-6'/>
            )
             : sprite ? (
                <>
                    <Image
                        src={sprite}
                        alt={`Pokémon ${id}`}
                        className="w-full h-full object-contain"
                        width={200}
                        height={200}
                    />
                    <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-1 py-[1px] rounded opacity-0 group-hover:opacity-100 transition"
                    >
                        #{id}
                    </span>
                </>
            ) : (
                <span>{id}</span>
            )}
        </div>

    );
}

export default PokedexItemContainer;
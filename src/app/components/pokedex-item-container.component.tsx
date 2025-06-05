import React from 'react';
import { PokedexItemProps } from '../models/pokedex-item-props';

const PokedexItemContainer: React.FC<PokedexItemProps> = ({ id, sprite, viewed, onSelect }) => (

    <div className="border-2 border-orange-400 rounded-lg hover:cursor-pointer bg-orange-100 w-[4rem] py-[1rem] font-bold text-center content-center text-black"
        onClick={() => onSelect(id)}>
        <span>{id}</span>
    </div>
);

export default PokedexItemContainer;
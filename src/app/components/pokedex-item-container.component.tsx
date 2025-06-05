import React from 'react';
import { PokedexItemProps } from '../models/pokedex-item-props';


export default function PokedexItemContainer(props: PokedexItemProps) {

    function itemOnClick(id: number) {
        console.log(id);
    }

    return (
        <div
            className="border-2 border-orange-400 rounded-lg hover:cursor-pointer bg-orange-100 w-[4rem] py-[1rem] font-bold text-center content-center text-black"
            onClick={() => itemOnClick(props.id)}
        >
            <span>{props.id}</span>
        </div>
    );
}
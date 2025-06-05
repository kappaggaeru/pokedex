"use client";

import PokedexItemContainer from "./pokedex-item-container.component";
import React, { useState } from 'react';
import PokemonCardComponent from "./pokemon-card-component";

const PokedexListComponent: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function handleSelect(id: number) {
        setSelectedId(id);
    }

    function PokedexList() {
        const pokedexItems = [];
        for (let i = 1; i <= 50; i++) {
            pokedexItems.push(
                <PokedexItemContainer key={i} id={i} onSelect={handleSelect} />
            );
        }
        return pokedexItems;
    }

    return (
        <div className="border-2 border-red-500 border-dashed grid grid-cols-2 grid-rows-1 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-10">
            <div className="col-span-5 auto-rows-auto md:col-span-2 lg:col-span-4 xl:col-start-2">
                <div className="flex flex-row flex-wrap gap-[1rem] bg-cyan-200 p-[1rem] justify-center">
                    <PokedexList />
                </div>
            </div>
            <div className="w-full bg-orange-300 col-span-4 row-span-1 md:col-span-2 lg:col-span-4 ">
                {
                    selectedId && (
                        <PokemonCardComponent id={selectedId} />
                    )
                }
            </div>
        </div>
    );
}

export default PokedexListComponent;
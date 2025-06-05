"use client";

import PokedexItemContainer from "./pokedex-item-container.component";
import React from 'react';

const PokedexListComponent: React.FC = () => {
    function PokedexList() {
        const pokedexItems = [];
        for (let i = 1; i <= 50; i++) {
            pokedexItems.push(<PokedexItemContainer key={i} id={i} />);
        }
        return pokedexItems;
    }

    return (
        <div className="col-span-5 auto-rows-auto md:col-span-2 lg:col-span-4 xl:col-start-2">
            <div className="flex flex-row flex-wrap gap-[1rem] bg-cyan-200 p-[1rem] justify-center">
                <PokedexList />
            </div>
            
        </div>
    );
}

export default PokedexListComponent;
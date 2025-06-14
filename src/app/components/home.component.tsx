"use client";

import React, { useState } from "react";
import PokedexListComponent from "./pokedex-list.component";
import PokemonCardComponent from "./pokemon-card.component";
import { useIsMobile } from "../hooks/useIsMobile";

const HomeComponent: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const isMobile = useIsMobile();

    const handleSelect = (id: number) => setSelectedId(id);
    const handleClear = () => setSelectedId(null);

    return (
        <div className="relative h-[80vh] bg-green-200 p-4 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-4">
            {/* Listado */}
            <div className="col-span-1 md:col-span-2 xl:col-span-5 bg-blue-300 overflow-auto">
                <PokedexListComponent onSelect={handleSelect} />
            </div>

            <div
                className={`
        col-span-1 md:col-span-2 xl:col-span-3
        bg-orange-200 overflow-auto
        transition-all duration-300
        ${selectedId ? "block" : "hidden"}
        md:block
        absolute md:static top-0 left-0 w-full h-full md:w-auto md:h-auto z-10
      `}
            >
                <PokemonCardComponent id={selectedId} clearCard={handleClear} />
            </div>
        </div>
    );
};

export default HomeComponent;

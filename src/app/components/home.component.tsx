"use client";

import React, { useState } from "react";
import PokedexListComponent from "./pokedex-list.component";
import PokemonCardComponent from "./pokemon-card.component";

const HomeComponent: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showCard, setShowCard] = useState(false);

    const handleSelect = (id: number) => {
        setSelectedId(id);
        setShowCard(true);
    };

    const handleClose = () => {
        setShowCard(false);
    };

    return (
        <div className="h-[80vh] bg-green-200 p-[1rem] grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-4">
            <div className="col-span-1 md:col-span-2 xl:col-span-5 bg-blue-300 overflow-auto">
                <div className={`md:block ${showCard ? "hidden" : "block"}`}>
                    <PokedexListComponent onSelect={handleSelect} />
                </div>
            </div>
            <div className="col-span-1 md:col-span-2 xl:col-span-3 bg-orange-200 overflow-auto">
                {showCard && selectedId && (
                    <div className={`md:block ${showCard ? "block" : "hidden"}`}>
                        <PokemonCardComponent id={selectedId} toggleCard={handleClose} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeComponent;

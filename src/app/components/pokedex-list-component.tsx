"use client";

import PokedexItemContainer from "./pokedex-item-container.component";
import React, { useState } from 'react';
import PokemonCardComponent from "./pokemon-card-component";
import { getSprite } from "../services/pokemon.service";

const PokedexListComponent: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showCard, setShowCard] = useState(false);
    const [viewedMap, setViewedMap] = useState<Record<number, string>>({});

    const toggleCard = () => {
        console.log(showCard);
        setShowCard(prev => !prev);
    };

    const handleSelect = async (id: number) => {
        setSelectedId(id);
        toggleCard();
        if (viewedMap[id]) return;
        try {
            const blob = await getSprite(id);
            const objectURL = URL.createObjectURL(blob);
            setViewedMap(prev => ({
                ...prev,
                [id]: objectURL
            }));
        } catch (error) {
            console.error('Error fetching sprite', error);
        }
    };

    const pokedexItems = [];
    for (let i = 1; i <= 100; i++) {
        pokedexItems.push(
            <PokedexItemContainer
                key={i}
                id={i}
                sprite={viewedMap[i] ?? null}
                viewed={!!viewedMap[i]}
                onSelect={handleSelect}
            />
        );
    }

    return (
        <div className="p-[1rem] bg-yellow-200 w-full h-full relative grid grid-cols-1 grid-rows-1 md:grid-cols-4 md:grid-rows-2 xl:grid-cols-8 xl:grid-rows-4">
            <div
                id="pokemonListContainer"
                className={`col-span-1 row-span-1 md:col-span-2 md:row-span-2 xl:col-span-5 xl:row-span-4`}>
                <div className={`bg-blue-300 w-full h-full flex flex-row flex-wrap justify-center gap-[1rem] overflow-auto ${showCard ? "hidden" : ""}`}>
                    {pokedexItems}
                </div>
            </div>

            <div
                id="pokemonCardContainer"
                className={`col-span-1 row-span-1 md:col-span-2 md:row-span-2 xl:col-span-3 xl:row-span-4`}>
                <div className={`bg-orange-200 w-full h-full ${showCard ? "" : "hidden"}`}>
                    {
                        selectedId && (
                            <PokemonCardComponent
                                id={selectedId}
                                toggleCard={toggleCard}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default PokedexListComponent;
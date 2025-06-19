"use client";

import React, { useEffect, useState } from "react";
import PokedexListComponent from "./pokedex-list.component";
import PokemonCardComponent from "./pokemon-card.component";
import ScrollTopButton from "../buttons/scroll-top.button";

const HomeComponent: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [seenIds, setSeenIds] = useState<Set<number>>(new Set());
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSelect = (id: number) => {
        setSelectedId(id);
        markAsSeen(id);
    }

    const handleClear = () => {
        setSelectedId(null);
    }

    const handleSetIdFromParent = (id: number) => {
        setSelectedId(id);
        markAsSeen(id);
    }

    const markAsSeen = (id: number) => {
        setSeenIds(prev => new Set(prev).add(id));
    };

    return (
        <div className="overflow-auto mb-20 mt-20">
            <div className="overflow-auto grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-4">
                <div
                    className={`
                    col-span-1 md:col-span-2 xl:col-span-5 overflow-auto px-[1rem]
                    ${selectedId ? "hidden" : "block"}
                    md:block
                    `}
                >
                    <PokedexListComponent onSelect={handleSelect} seenIds={seenIds} />
                </div>

                <div
                    className={`
                    col-span-1 md:col-span-2 xl:col-span-3 overflow-auto
                    ${selectedId ? "block" : "hidden"}
                    md:block
                    `}
                >
                    <PokemonCardComponent
                        key={selectedId}
                        id={selectedId}
                        clearCard={handleClear}
                        setIdFromParent={handleSetIdFromParent}
                    />
                </div>
            </div>
            <ScrollTopButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} isVisible={showScrollTop} />
        </div>
    );
};

export default HomeComponent;

"use client";

import React, { useEffect, useState } from "react";
import PokedexItemContainer from "./pokedex-item-container.component";
import { getPokedexData, getSprite } from "../../services/pokemon.service";
import { usePokemon } from "@/app/context/pokemonContext";
import { useCookies } from "react-cookie";
import { useHasMounted } from "@/app/hooks/useHasMounted";

type Props = {
    onSelect: (id: number) => void;
};

type ViewedState = {
    loading: boolean;
    sprite?: string;
};

const PokedexListComponent: React.FC<Props> = ({ onSelect }) => {
    const hasMounted = useHasMounted();
    const [pokemonList, setPokemonList] = useState<{ id: number, name: string }[]>([]);
    const [viewedMap, setViewedMap] = useState<Record<number, ViewedState>>({});
    const [cookies] = useCookies(["capturedList"]);
    const { capturePokemon } = usePokemon();
    const generations = [
        { name: "Kanto", count: 151, roman: "I" },
        { name: "Johto", count: 100, roman: "II" },
        { name: "Hoenn", count: 135, roman: "III" },
        { name: "Sinnoh", count: 107, roman: "IV" },
        { name: "Unova", count: 156, roman: "V" },
        { name: "Kalos", count: 72, roman: "VI" },
        { name: "Alola", count: 88, roman: "VII" },
        { name: "Galar", count: 96, roman: "VIII" },
        { name: "Paldea", count: 120, roman: "IX" },
    ];


    const seenIds = React.useMemo(() => {
        const raw = cookies.capturedList;
        const capturedList = typeof raw === "string" ? raw : "";
        const ids = capturedList
            .split(",")
            .filter((v) => v !== "")
            .map(Number);
        return new Set<number>(ids);
    }, [cookies.capturedList]);

    useEffect(() => {
        const fetchPokedex = async () => {
            try {
                const data = await getPokedexData();
                const entries = data.pokemon_entries.map((entry: any) => ({
                    id: entry.entry_number,
                    name: entry.pokemon_species.name
                }));
                setPokemonList(entries);
            } catch (e) {
                console.error("Error loading pokedex:", e);
            }
        };

        if (hasMounted) fetchPokedex();
    }, [hasMounted]);


    useEffect(() => {
        if (hasMounted) {
            const preloadCapturedSprites = async () => {
                const raw = cookies.capturedList;
                const capturedList = typeof raw === "string" ? raw : "";
                const ids = capturedList
                    .split(",")
                    .filter((v) => v !== "")
                    .map(Number);

                for (const id of ids) {
                    if (!viewedMap[id]) {
                        // Marcamos como cargando
                        setViewedMap((prev) => ({
                            ...prev,
                            [id]: { loading: true },
                        }));

                        try {
                            const blob = await getSprite(id);
                            const objectURL = URL.createObjectURL(blob);
                            setViewedMap((prev) => ({
                                ...prev,
                                [id]: { loading: false, sprite: objectURL },
                            }));
                        } catch (e) {
                            console.error(`Error loading sprite for id: ${id}`, e);
                            setViewedMap((prev) => ({
                                ...prev,
                                [id]: { loading: false },
                            }));
                        }
                    }
                }
            };

            preloadCapturedSprites();
        }
    }, [hasMounted, cookies.capturedList]);


    const handleSelect = async (id: number) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        onSelect(id);
        capturePokemon(id);

        if (viewedMap[id]?.sprite) return;

        setViewedMap((prev) => ({
            ...prev,
            [id]: { loading: true },
        }));

        try {
            const blob = await getSprite(id);
            const objectURL = URL.createObjectURL(blob);
            setViewedMap((prev) => ({
                ...prev,
                [id]: { loading: false, sprite: objectURL },
            }));
        } catch (error) {
            console.error("Error fetching sprite", error);
            setViewedMap((prev) => ({
                ...prev,
                [id]: { loading: false },
            }));
        }
    };

    const getSegmentedList = () => {
        let index = 0;
        const segments = generations.map((gen) => {
            const items = pokemonList.slice(index, index + gen.count).map(({ id }) => {
                const viewedData = viewedMap[id];
                return (
                    <PokedexItemContainer
                        key={id}
                        id={id}
                        sprite={viewedData?.sprite ?? ''}
                        loading={viewedData?.loading ?? false}
                        viewed={seenIds.has(id)}
                        onSelect={handleSelect}
                    />
                );
            });

            const segment = (
                <div key={gen.name} className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-gray-500 pl-4 text-nowrap">
                            {gen.name} ({index + 1} - {index + gen.count} GEN {gen.roman})
                        </p>
                        <div className="w-full border border-gray-200/50 dark:border-gray-600/50"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-[1rem] py-[1rem]">
                        {items}
                    </div>
                </div>
            );

            index += gen.count;
            return segment;
        });

        return segments;
    };

    if (!hasMounted) return null;

    return (
        <div className="flex flex-wrap justify-center gap-[1rem] py-[1rem]">
            {getSegmentedList()}
        </div>
    );
};

export default PokedexListComponent;

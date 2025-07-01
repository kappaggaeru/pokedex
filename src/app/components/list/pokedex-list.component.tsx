"use client";

import React, { useEffect, useState } from "react";
import PokedexItemContainer from "./pokedex-item-container.component";
import { getSprite } from "../../services/pokemon.service";
import { usePokemon } from "@/app/context/pokemonContext";
import { useCookies } from "react-cookie";

type Props = {
    onSelect: (id: number) => void;
};

type ViewedState = {
    loading: boolean;
    sprite?: string;
};

const PokedexListComponent: React.FC<Props> = ({ onSelect }) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [viewedMap, setViewedMap] = useState<Record<number, ViewedState>>({});
    const { capturePokemon } = usePokemon();
    const [cookies] = useCookies(["capturedList"]);

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
        setHasMounted(true);

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
    }, []);

    if (!hasMounted) return null;

    const handleSelect = async (id: number) => {
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

    const pokedexItems = Array.from({ length: 400 }, (_, i) => {
        const id = i + 1;
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

    return (
        <div className="flex flex-wrap justify-center gap-[1rem] py-[1rem]">
            {pokedexItems}
        </div>
    );
};

export default PokedexListComponent;

"use client";

import React, { useEffect, useState } from "react";
import PokedexItemContainer from "./pokedex-item-container.component";
import { getSprite } from "../../services/pokemon.service";
import { usePokemon } from "@/app/context/pokemonContext";
import { useCookies } from "react-cookie";

type Props = {
    onSelect: (id: number) => void;
};

const PokedexListComponent: React.FC<Props> = ({ onSelect }) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [viewedMap, setViewedMap] = useState<Record<number, string>>({});
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
            const capturedList = typeof raw === "string" ? raw : ""; // si no es string, falla
            const ids = capturedList
                .split(",")
                .filter((v) => v !== "")
                .map(Number);

            const newEntries: Record<number, string> = {};
            await Promise.all(
                ids.map(async (id) => {
                    if (!viewedMap[id]) {
                        try {
                            const blob = await getSprite(id);
                            const objectURL = URL.createObjectURL(blob);
                            newEntries[id] = objectURL;
                        } catch (e) {
                            console.error(`Error loading sprite for id: ${id}`, e);
                        }
                    }
                })
            );

            if (Object.keys(newEntries).length > 0) {
                setViewedMap((prev) => ({
                    ...prev,
                    ...newEntries,
                }));
            }
        };

        preloadCapturedSprites();
    }, []);

    if (!hasMounted) return null;

    const handleSelect = async (id: number) => {
        onSelect(id);
        capturePokemon(id);
        if (viewedMap[id]) return;
        try {
            const blob = await getSprite(id);
            const objectURL = URL.createObjectURL(blob);
            setViewedMap((prev) => ({
                ...prev,
                [id]: objectURL,
            }));
        } catch (error) {
            console.error("Error fetching sprite", error);
        }
    };

    const pokedexItems = Array.from({ length: 400 }, (_, i) => {
        const id = i + 1;
        return (
            <PokedexItemContainer
                key={id}
                id={id}
                sprite={viewedMap[id] ?? null}
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

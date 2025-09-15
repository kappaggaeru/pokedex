"use client";

import React, { useEffect, useState } from "react";
import PokedexItemContainer from "./pokedex-item-container.component";
import { getPokedexData, getSprite } from "../../services/pokemon.service";
import { usePokemon } from "@/app/context/pokemonContext";
import { useCookies } from "react-cookie";
import { useHasMounted } from "@/app/hooks/useHasMounted";
import { GenerationPokedexEntry } from "@/app/models/dto/generation-entry.model";

const PokedexListComponent: React.FC = () => {
    const hasMounted = useHasMounted();
    const {
        pokemonList,
        viewedMap,
        capturedList,
        generations,
        filteredRegions,
        setPokemonList,
        selectPokemon,
        setViewedMap
    } = usePokemon();

    const [cookies] = useCookies(["capturedList"]);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const enabledPreloadSprites = false;

    // Convertir cookies Y capturedList del contexto a Set para búsquedas más eficientes
    const seenIds = React.useMemo(() => {
        // Combinar cookies y capturedList para evitar desfase
        const cookieIds = typeof cookies.capturedList === "string" && cookies.capturedList
            ? cookies.capturedList.split(",").filter((v) => v !== "").map(Number)
            : [];

        // Unir ambas fuentes y eliminar duplicados
        const allIds = [...new Set([...cookieIds, ...capturedList])];
        return new Set<number>(allIds);
    }, [cookies.capturedList, capturedList]);

    // Función simplificada que delega al contexto
    const handlePokemonSelect = (id: number): void => {
        console.log('handlePokemonSelect', id);
        selectPokemon(id);
    };

    // Cargar la lista de la pokédex
    useEffect(() => {
        const fetchPokedex = async () => {
            try {
                const data = await getPokedexData();
                const entries = data.pokemon_entries.map((entry: GenerationPokedexEntry) => ({
                    id: entry.entry_number,
                    name: entry.pokemon_species.name
                }));
                setPokemonList(entries);
            } catch (e) {
                setFailed(true);
                console.error("Error loading pokedex:", e);
            } finally {
                setLoading(false);
            }
        };

        if (hasMounted) fetchPokedex();
    }, [hasMounted, setPokemonList]);

    // Precargar sprites de pokémon capturados desde cookies Y del contexto
    useEffect(() => {
        if (!hasMounted) return;

        const preloadCapturedSprites = async () => {
            // Obtener IDs de cookies
            const cookieIds = typeof cookies.capturedList === "string" && cookies.capturedList
                ? cookies.capturedList.split(",").filter((v) => v !== "").map(Number)
                : [];

            // Combinar cookies y capturedList del contexto
            const allIds = [...new Set([...cookieIds, ...capturedList])];

            for (const id of allIds) {
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
                            [id]: { loading: false, error: true },
                        }));
                    }
                }
            }
        };

        const cookieIds = typeof cookies.capturedList === "string" && cookies.capturedList
            ? cookies.capturedList.split(",").filter((v) => v !== "").map(Number)
            : [];

        // Ejecutar si hay cookies O si hay pokémon capturados en el contexto
        if ((cookieIds.length > 0 || capturedList.length > 0) && enabledPreloadSprites) {
            console.log('avoid to load sprites because error 429');
            preloadCapturedSprites();
        }
    }, [hasMounted, cookies.capturedList, capturedList, viewedMap, setViewedMap]);

    // Crear la lista segmentada por regiones
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
                        error={viewedData?.error ?? false}
                        viewed={seenIds.has(id)}
                        onSelect={() => handlePokemonSelect(id)}
                    />
                );
            });

            const segment = (
                <div key={gen.name} className={`flex flex-col ${filteredRegions.includes(gen.name) ? "block" : "hidden"}`}>
                    <div className="flex flex-row gap-2 items-center px-4">
                        <p className="text-gray-500 text-nowrap">
                            {gen.name} <span className="text-sm">({index + 1} - {index + gen.count} GEN {gen.roman})</span>
                        </p>
                        <div className="w-full border border-gray-200/50 dark:border-gray-600/50"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 py-4">
                        {items}
                    </div>
                </div>
            );

            index += gen.count;
            return segment;
        });

        return segments;
    };

    const PokeballSpinner = () => {
        return (
            <div className="flex justify-center items-center py-10">
                <svg
                    className="w-8 h-8 animate-spin"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="#f0f0f0"
                        stroke="#d1d5db"
                        strokeWidth="4"
                        className="dark:stroke-gray-600"
                    />
                    {/* Mitad superior roja */}
                    <path d="M50 2 A48 48 0 0 1 98 50 H2 A48 48 0 0 1 50 2 Z" fill="#ef4444" />
                    {/* Mitad inferior blanca */}
                    <path d="M2 50 H98 A48 48 0 0 1 50 98 A48 48 0 0 1 2 50 Z" fill="white" />
                    {/* Franja negra al centro */}
                    <rect x="0" y="46" width="100" height="8" fill="black" />
                    {/* Círculo central blanco con borde negro */}
                    <circle cx="50" cy="50" r="12" fill="white" stroke="black" strokeWidth="6" />
                </svg>
            </div>
        );
    };

    if (!hasMounted || loading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <PokeballSpinner />
            </div>
        );
    }

    if (failed) {
        return (
            <div className="h-[40rem] max-w-sm mx-auto w-full flex flex-col items-center justify-center text-gray-500 text-center">
                <h1 className="font-semibold text-xl">Error</h1>
                <p className="px-4">An error occurred while fetching the Pokémon list. Please try again later.</p>
            </div>
        )
    }

    if (filteredRegions.length == 0) {
        return (
            <div className="h-[40rem] max-w-sm mx-auto w-full flex flex-col items-center justify-center text-gray-500 text-center">
                <h1 className="font-semibold text-xl">Your Pokédex is empty!</h1>
                <p className="px-4">No Pokémon showed up this time... maybe they&#39;re all hiding in tall grass. 🌱 Try another filter!</p>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 py-4">
            {getSegmentedList()}
        </div>
    );
};

export default PokedexListComponent;
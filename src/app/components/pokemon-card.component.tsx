"use client";
import { useEffect, useState } from "react";
import { getPokemonById, getPokemonFormById, getPokemonSpeciesById, getArtwork } from "../services/pokemon.service";
import PokemonArtworkComponent from "./artwork.component";
import { StatBar } from "./stat-bar.component";
import { PokemonCardProps } from "../models/props/pokedex-card-props";
import { StatBarProps } from "../models/props/pokedex-stat-props";
import { Pokemon } from "../models/dto/pokemon-model";
import { Species } from "../models/dto/species-model";
import { Form } from "../models/dto/form-model";
import CloseButton from "../buttons/close.button";

const PokemonCardComponent: React.FC<PokemonCardProps> = ({ id, clearCard }) => {
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonSpecie, setPokemonSpecie] = useState<Species | null>(null);
    const [pokemonForm, setPokemonForm] = useState<Form | null>(null);
    const [pokemonArtwork, setPokemonArtwork] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        let objectUrlTemp: string | null = null;

        const fetchAllData = async () => {
            try {
                const [pokemon, species, form, blob] = await Promise.all([
                    getPokemonById(id),
                    getPokemonSpeciesById(id),
                    getPokemonFormById(id),
                    getArtwork(id)
                ]);

                objectUrlTemp = URL.createObjectURL(blob);

                setPokemonData(pokemon);
                setPokemonSpecie(species);
                setPokemonForm(form);
                setPokemonArtwork(objectUrlTemp);
            } catch (error) {
                console.error("Error al obtener datos del Pokémon:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();

        return () => {
            if (objectUrlTemp) {
                URL.revokeObjectURL(objectUrlTemp);
            }
        };
    }, [id]);


    const statsColors: StatBarProps["color"][] = [
        "green", "red", "blue", "violet", "lightblue", "yellow"
    ];

    const statComponents = pokemonData
        ? pokemonData.stats.map((stat, index) => (
            <StatBar
                key={stat.stat.name}
                title={stat.stat.name ?? ""}
                value={stat.base_stat}
                color={statsColors[index % statsColors.length]}
            />
        ))
        : [];

    if (id === null) {
        return (
            <div className="h-full w-full flex items-center justify-center text-gray-500 ">
                <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold">Selecciona un Pokémon</h2>
                    <p className="text-sm">Haz clic en uno de la lista para ver sus detalles.</p>
                </div>
            </div>
        );
    } else if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <div className="animate-pulse w-full p-4 space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto" />
                    <div className="h-40 bg-gray-300 rounded" />
                    <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
                    <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto" />
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative h-full w-full">
                <CloseButton onClick={clearCard} isVisible={true} />

                {pokemonSpecie &&
                    <div className="flex flex-col m-[1rem] mx-[2.5rem]">
                        <div className="flex flex-row">
                            <div className="w-14 h-14 bg-blue-400 border-white border-4 rounded-full mr-[1rem]">
                                
                            </div>
                            <div className=" flex flex-row align-baseline">
                                <div className="w-3 h-3 border border-black bg-red-500 rounded-full mr-[.5rem]"></div>
                                <div className="w-3 h-3 border border-black bg-yellow-500 rounded-full mr-[.5rem]"></div>
                                <div className="w-3 h-3 border border-black bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                        {/* <div className="w-full flex flex-row justify-between items-center text-black pr-[1rem] pl-[1rem]">
                            <h4 className="text-3xl uppercase">{pokemonSpecie.name}</h4>
                            <span>{pokemonSpecie.id}</span>
                        </div> */}
                    </div>
                }

                {pokemonForm &&
                    <div className="h-fit flex flex-col justify-center items-center px-[2rem] py-[1rem] bg-[#fafafa] m-[1rem] mx-[2.5rem] rounded border border-black">
                        <div className="flex flex-row justify-center mb-[1rem]">
                            <div className="w-2 h-2 bg-red-600 border border-black mx-[0.5rem] rounded-full"></div>
                            <div className="w-2 h-2 bg-red-600 border border-black mx-[0.5rem] rounded-full"></div>
                        </div>
                        <PokemonArtworkComponent id={id} artworkUrl={pokemonArtwork} />
                        <div className="flex flex-row justify-between items-center w-full mt-[1rem]">
                            <div className="w-5 h-5 bg-red-600 border border-black rounded-full"></div>
                            <div className=" w-[2rem] flex flex-col">
                                <div className="w-full h-[2px] bg-stone-700"></div>
                                <div className="w-full h-[2px] bg-stone-700 mt-1"></div>
                                <div className="w-full h-[2px] bg-stone-700 mt-1"></div>
                                <div className="w-full h-[2px] bg-stone-700 mt-1"></div>
                            </div>
                        </div>
                    </div>
                }

                {pokemonSpecie &&
                    <div className="px-[1rem]">
                        <h1 className="text-xl">Stats</h1>
                        {statComponents}
                    </div>
                }
            </div>
        );
    }
};

export default PokemonCardComponent;

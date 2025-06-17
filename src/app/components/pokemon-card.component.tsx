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
import IdNavigatorButton from "../buttons/id-navigator.button";

const PokemonCardComponent: React.FC<PokemonCardProps> = ({ id, clearCard, setIdFromParent }) => {
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonSpecies, setPokemonSpecie] = useState<Species | null>(null);
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

    const nextPokemon = () => {
        if (id) {
            setIdFromParent(id + 1);
        }
    };

    const prevPokemon = () => {
        if (id !== null && id > 1) {
            setIdFromParent(id - 1);
        }
    };


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
                    <h2 className="text-xl font-semibold">Select a Pokémon</h2>
                    <p className="text-sm">Click on a item from the list to view the details.</p>
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
            <div>
                {pokemonSpecies &&
                    <div className="flex flex-row m-[1rem] justify-between">
                        <div className="flex flex-row">
                            <div className="w-14 h-14 bg-blue-400 border-white border-4 rounded-full mr-[1rem]"></div>
                            <div className=" flex flex-row align-baseline">
                                <div className="w-3 h-3 border border-black bg-red-500 rounded-full mr-[.5rem]"></div>
                                <div className="w-3 h-3 border border-black bg-yellow-500 rounded-full mr-[.5rem]"></div>
                                <div className="w-3 h-3 border border-black bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                        <CloseButton onClick={clearCard} isVisible={true} />
                    </div>
                }

                {pokemonForm &&
                    <div className=" h-fit flex flex-col justify-center items-center px-[1rem] pt-[1rem] m-[1rem] mb-0 rounded-xl border border-black border-b-0 rounded-b-none" style={{ backgroundColor: "var(--my-white)" }}>
                        <div className="flex flex-row justify-center mb-[1rem]">
                            <div className="w-2 h-2 bg-red-600 border border-black mx-[0.5rem] rounded-full"></div>
                            <div className="w-2 h-2 bg-red-600 border border-black mx-[0.5rem] rounded-full"></div>
                        </div>
                        <PokemonArtworkComponent id={id} artworkUrl={pokemonArtwork} />
                    </div>
                }

                <div className="flex flex-row mx-[1rem]">
                    <div className="relative">
                        <div className="absolute bottom-0 left-0 w-0 h-0 z-0"
                            style={{
                                borderLeft: "2.1rem solid black",
                                borderTop: "2.1rem solid transparent"
                            }}
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0 z-10"
                            style={{
                                borderLeft: "2rem solid white",
                                borderTop: "2rem solid transparent"
                            }}
                        />
                    </div>
                    <div className="w-full px-[2rem] content-center border border-black border-t-0 rounded-br-xl" style={{ backgroundColor: "var(--my-white)" }}>
                        <div className="flex flex-row justify-between w-full py-[0.5rem]">
                            {
                                pokemonSpecies &&
                                <div className="w-full flex justify-end text-black">
                                    <h4 className="text-xl uppercase h-full">{pokemonSpecies.name}</h4>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {/* <IdNavigatorButton prevPokemon={prevPokemon} id={id} nextPokemon={nextPokemon} /> */}

                {pokemonSpecies &&
                    <div className="p-[1rem] m-[1rem] shadow-xl rounded-xl bg-white">
                        <h1 className="text-xl font-bold">Stats</h1>
                        {statComponents}
                    </div>
                }
            </div>
        );
    }
};

export default PokemonCardComponent;

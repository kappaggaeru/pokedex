"use client";
import { useEffect, useState } from "react";
import { getPokemonById, getPokemonFormById, getPokemonSpeciesById, getArtworkById, getSprite } from "../services/pokemon.service";
import PokemonArtworkComponent from "./artwork.component";
import { StatBar } from "./stat-bar.component";
import { PokemonCardProps } from "../models/props/pokedex-card.props";
import { StatBarProps } from "../models/props/pokedex-stat.props";
import { Pokemon } from "../models/dto/pokemon.model";
import { Species } from "../models/dto/species.model";
import { Form } from "../models/dto/form.model";
import CloseButton from "../buttons/close.button";
import { EvolutionChain } from "../models/dto/evolution-chain.model";
import { Generic } from "../models/dto/generic.model";
import EvolutionChainComponent from "./evolution-chain.component";
import { EvolutionStage } from "../models/evolution-stage.model";
import { ChipComponent } from "./chip.component";
import { PokedexEntry } from "../models/pokedex-entry.model";
import PokedexEntryComponent from "./pokedex-entry.component";
import TypewriterText from "./typewriter-text.component";

type EvolutionNode = {
    species: {
        name?: string;
        url?: string;
    };
    evolves_to: EvolutionNode[];
};

const PokemonCardComponent: React.FC<PokemonCardProps> = ({ id, clearCard, setIdFromParent }) => {
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonSpecies, setPokemonSpecies] = useState<Species | null>(null);
    const [pokemonForm, setPokemonForm] = useState<Form | null>(null);
    const [pokemonArtwork, setPokemonArtwork] = useState<string | null>(null);
    const [pokemonEvolution, setPokemonEvolution] = useState<EvolutionChain | null>(null);
    const [evolutionChainList, setEvolutionChainList] = useState<EvolutionStage[]>([]);
    const [entryText, setEntryText] = useState<string>("");
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
                    getArtworkById(id),
                ]);
                objectUrlTemp = URL.createObjectURL(blob);

                setPokemonData(pokemon);
                setPokemonSpecies(species);
                setPokemonForm(form);
                setPokemonArtwork(objectUrlTemp);

                if (species.evolution_chain.url) {
                    const evolutionRes = await fetch(species.evolution_chain.url);
                    const evolutionData = await evolutionRes.json();
                    setPokemonEvolution(evolutionData);
                }

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

    useEffect(() => {
        if (pokemonEvolution) {
            const evolutionChainList = flattenEvolutionChain(pokemonEvolution.chain);

            Promise.all(
                evolutionChainList.map(async (entry) => {
                    const urlParts = entry.url.split('/');
                    const id = +urlParts[urlParts.length - 2];
                    const sprite = await getSprite(id); // Usa tu método actual
                    return {
                        id,
                        name: entry.name ?? '',
                        sprite: URL.createObjectURL(sprite), // o directo si ya devuelve url
                    };
                })
            ).then(parsedEvolutionList => {
                setEvolutionChainList(parsedEvolutionList); // Estado nuevo
            });
        }
    }, [pokemonEvolution]);

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

    const entries: PokedexEntry[] = [];

    pokemonSpecies?.flavor_text_entries.map((flavor) => {
        if (flavor.language.name == 'en') {
            entries.push({
                language: flavor.language.name ?? '',
                entry: formatFlavorText(flavor.flavor_text),
                version: flavor.version.name ?? ''
            });
        }
    });

    function formatFlavorText(flavor: string) {
        return flavor.replace(/\f/g, ' ').replace(/\n/g, ' ');
    }

    const flattenEvolutionChain = (chain: EvolutionNode): Generic[] => {
        const result: Generic[] = [];

        const traverse = (node: EvolutionNode) => {
            if (!node) return;
            result.push({
                name: node.species.name ?? '',
                url: node.species.url ?? ''
            });
            if (node.evolves_to.length > 0) {
                traverse(node.evolves_to[0]); // solo tomamos la primera rama por simplicidad
            }
        };

        traverse(chain);
        return result;
    };

    const pokemonTypes = pokemonForm?.types.map((element, index) => (
        <ChipComponent
            key={index}
            title={element.type.name ?? ''}
        />
    ));

    if (id === null) {
        return (
            <div className="h-[40rem] w-full flex items-center justify-center text-gray-500">
                <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold">Select a Pokémon</h2>
                    <p className="text-sm">Click on a item from the list to view the details.</p>
                </div>
            </div>
        );
    } else if (loading) {
        return (
            <div className="h-[40rem] w-full flex items-center justify-center">
                <div className="animate-pulse w-full p-4 space-y-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto" />
                    <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mx-auto" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto" />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="flex flex-row m-[1rem] justify-between">
                    <div className="flex flex-row">
                        <div className="w-14 h-14 bg-blue-400 rounded-full mr-[1rem]"></div>
                        <div className=" flex flex-row align-baseline">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-[.5rem]"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-[.5rem]"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                    <CloseButton onClick={clearCard} isVisible={true} />
                </div>

                <div className="h-fit flex flex-col justify-center items-center px-[1rem] pt-[1rem] m-[1rem] mb-0 rounded-xl border border-gray-200/50 dark:border-gray-600/50 shadow-lg dark:bg-slate-800">
                    <div className="flex flex-row justify-center mb-[1rem]">
                        <div className="w-2 h-2 bg-red-600  mx-[0.5rem] rounded-full"></div>
                        <div className="w-2 h-2 bg-red-600  mx-[0.5rem] rounded-full"></div>
                    </div>
                    <PokemonArtworkComponent id={id} artworkUrl={pokemonArtwork} />
                    {
                        pokemonSpecies &&
                        <div className="w-full flex justify-end items-center space-x-2 my-[0.3rem]">
                            <span className="text-md text-gray-400">#{id}</span>
                            <h4 className="text-xl uppercase text-black dark:text-gray-300">{pokemonSpecies.name}</h4>
                        </div>
                    }
                </div>

                {entries.length > 0 &&
                    <div className="p-4 rounded-xl flex flex-col text-black dark:text-gray-300">
                        <PokedexEntryComponent entries={entries} onEntryChange={setEntryText} />
                    </div>
                }

                <div className="p-4 mx-4 shadow-xl rounded-xl border text-black dark:text-gray-300 bg-white dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50">
                    <h3 className="text-xl font-bold mb-4">Pokedex entry</h3>
                    <TypewriterText text={entryText} speed={10}/>
                </div>

                {evolutionChainList && evolutionChainList.length > 1 && (
                    <div className="p-[1rem] m-[1rem] shadow-xl rounded-xl border text-black dark:text-gray-300 bg-white dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50">
                        <h3 className="text-xl font-bold">Evolution chain</h3>
                        <EvolutionChainComponent chain={evolutionChainList} onSelect={setIdFromParent} />
                    </div>
                )}

                <div className="p-[1rem] m-[1rem] shadow-xl rounded-xl border text-black dark:text-gray-300 bg-white dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50">
                    <h3 className="text-xl font-bold mb-[1rem]">Types</h3>
                    <div className="flex flex-row gap-3">
                        {pokemonTypes}
                    </div>
                </div>


                <div className="p-[1rem] m-[1rem] shadow-xl rounded-xl border text-black dark:text-gray-300 bg-white dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50 mb-20">
                    <h3 className="text-xl font-bold mb-[1rem]">Stats</h3>
                    {statComponents}
                </div>
            </div>
        );
    }
};

export default PokemonCardComponent;

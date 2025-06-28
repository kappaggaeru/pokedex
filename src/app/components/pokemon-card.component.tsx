"use client";
import { useEffect, useState } from "react";
import { getPokemonById, getArtworkById, getSprite } from "../services/pokemon.service";
import PokemonArtworkComponent from "./artwork.component";
import { StatBar } from "./stat-bar.component";
import { PokemonCardProps } from "../models/props/pokedex-card.props";
import { StatBarProps } from "../models/props/pokedex-stat.props";
import { Pokemon } from "../models/dto/pokemon.model";
import { Species } from "../models/dto/species.model";
import { Form } from "../models/dto/form.model";
import { EvolutionChain } from "../models/dto/evolution-chain.model";
import { Generic } from "../models/dto/generic.model";
import EvolutionChainComponent from "./evolution-chain.component";
import { EvolutionStage } from "../models/evolution-stage.model";
import { ChipComponent } from "./chip.component";
import { PokedexEntry } from "../models/pokedex-entry.model";
import PokedexEntryComponent from "./pokedex-entry.component";
import FadeText from "./text/fade-text.component";
import DefaultButton from "../buttons/default.button";
import { X } from "lucide-react";
import { Varieties } from "../models/dto/varieties.model";
import { usePokemonTier } from "../context/pokemonContext";

type EvolutionNode = {
    species: {
        name?: string;
        url?: string;
    };
    evolves_to: EvolutionNode[];
};

const PokemonCardComponent: React.FC<PokemonCardProps> = ({ id, clearCard, setIdFromParent }) => {
    const { setTier } = usePokemonTier();
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonSpecies, setPokemonSpecies] = useState<Species | null>(null);
    const [pokemonForm, setPokemonForm] = useState<Form | null>(null);
    const [pokemonArtwork, setPokemonArtwork] = useState<string | null>(null);
    const [pokemonEvolution, setPokemonEvolution] = useState<EvolutionChain | null>(null);
    const [evolutionChainList, setEvolutionChainList] = useState<EvolutionStage[]>([]);
    const [varietiesList, setVarietiesList] = useState<EvolutionStage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        let objectUrlTemp: string | null = null;

        const fetchAllData = async () => {
            try {
                const pokemon = await getPokemonById(id);
                const [species, form] = await Promise.all([
                    fetch(pokemon.species.url).then(res => res.json()),
                    fetch(pokemon.forms[0].url).then(res => res.json())
                ]);

                const blob = await getArtworkById(pokemon.id);
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
                console.error("Error fetching pokemon data:", error);
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
        if (pokemonSpecies?.is_legendary) {
            setTier("legendary");
        } else if (pokemonSpecies?.is_mythical) {
            setTier("mythical");
        } else {
            setTier("normal");
        }
    }, [pokemonSpecies]);

    useEffect(() => {
        if (pokemonEvolution) {
            const evolutionChainList = flattenEvolutionChain(pokemonEvolution.chain);

            Promise.all(
                evolutionChainList.map(async (entry) => {
                    const urlParts = entry.url.split('/');
                    const id = +urlParts[urlParts.length - 2];
                    const sprite = await getSprite(id);
                    return {
                        id,
                        name: entry.name ?? '',
                        sprite: URL.createObjectURL(sprite),
                    };
                })
            ).then(parsedEvolutionList => {
                setEvolutionChainList(parsedEvolutionList);
            });
        }
    }, [pokemonEvolution]);

    useEffect(() => {
        if (pokemonSpecies && pokemonSpecies.varieties.length > 1) {
            const baseName = pokemonSpecies.name.toLowerCase();
            let allVarieties = [...pokemonSpecies.varieties];

            if ((allVarieties[0].pokemon.name?.toLowerCase() ?? '') === baseName) {
                allVarieties = allVarieties.slice(1);
            }

            const objectUrls: string[] = [];

            Promise.all(
                allVarieties.map(async (entry) => {
                    const urlParts = entry.pokemon.url.split('/');
                    const id = +urlParts[urlParts.length - 2];
                    const sprite = await getSprite(id);
                    const objectUrl = URL.createObjectURL(sprite);
                    objectUrls.push(objectUrl);
                    return {
                        id,
                        name: entry.pokemon.name ? entry.pokemon.name.replace(/-/g, ' ') : '',
                        sprite: objectUrl,
                    };
                })
            ).then(parsedVarietiesList => {
                setVarietiesList(parsedVarietiesList);
            });

            return () => {
                objectUrls.forEach(url => URL.revokeObjectURL(url));
            };
        }
    }, [pokemonSpecies]);

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
            for (const evolution of node.evolves_to) {
                traverse(evolution);
            }
        };

        traverse(chain);
        return result;
    };

    const flattenVarietiesList = (list: Varieties[]): Generic[] => {
        const result: Generic[] = [];

        list.forEach((node) => {
            if (!node) return;
            const variantName = node.pokemon.name ? formatVariantName(node.pokemon.name) : '';
            result.push({
                name: variantName,
                url: node.pokemon.url ?? ''
            });
        });

        return result;
    };

    const pokemonTypes = pokemonForm?.types.map((element, index) => (
        <ChipComponent
            key={index}
            title={element.type.name ?? ''}
        />
    ));

    const formatVariantName = (name: string) =>
        name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

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
                <div className="flex flex-row m-[1rem] mx-6 justify-between">
                    <div className="flex flex-row">
                        <div className="w-14 h-14 bg-blue-400 rounded-full mr-[1rem] ring-2 border border-gray-200/50 dark:border-gray-600/50"></div>
                        <div className=" flex flex-row align-baseline">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-[.5rem]"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-[.5rem]"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                    <DefaultButton onClick={clearCard} isVisible={true} icon={X} className="z-10" />
                </div>

                <div
                    className={`
                        relative h-fit flex flex-col justify-center items-center px-[1rem] pt-[1rem] my-[1rem] mb-0 mx-6 rounded-xl border shadow-xl transition-all duration-500
                        before:absolute before:inset-0 before:rounded-xl before:blur-md before:z-[-1]
                        ${pokemonSpecies?.is_legendary
                            ? 'border-yellow-400 dark:border-yellow-600 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 dark:from-yellow-700 dark:via-yellow-800 dark:to-yellow-600 before:animate-glow-yellow'
                            : pokemonSpecies?.is_mythical
                                ? 'border-gray-400 dark:border-gray-500 bg-gradient-to-r from-gray-200 via-white to-gray-300 dark:from-slate-600 dark:via-slate-700 dark:to-slate-500 before:animate-glow-silver'
                                : 'border-gray-200/50 dark:border-gray-600/50 bg-white dark:bg-slate-800'
                        }`}
                >

                    {(pokemonSpecies?.is_legendary || pokemonSpecies?.is_mythical) && (
                        <div
                            className={`absolute top-0 left-0 py-1 px-4 rounded-tl-xl rounded-br-xl text-xs uppercase text-white font-semibold backdrop-blur-sm bg-gradient-to-r ${pokemonSpecies?.is_legendary
                                ? 'from-yellow-400/70 to-yellow-600/70'
                                : 'from-gray-400/70 to-gray-600/70'
                                }`}
                        >
                            {pokemonSpecies?.is_legendary ? "legendary" : "mythical"}
                        </div>
                    )}


                    <div className="flex flex-row justify-center mb-[1rem]">
                        <div className="w-2 h-2 bg-red-600 mx-[0.5rem] rounded-full"></div>
                        <div className="w-2 h-2 bg-red-600 mx-[0.5rem] rounded-full"></div>
                    </div>

                    <PokemonArtworkComponent id={id} artworkUrl={pokemonArtwork} />

                    <div className="flex flex-row items-center w-full justify-between">
                        {pokemonData && (
                            <div className="flex justify-end w-full items-center space-x-2 my-[0.3rem]">
                                <span className="text-md text-gray-400">#{id}</span>
                                <h4 className="text-xl uppercase text-black dark:text-gray-300">
                                    {formatVariantName(pokemonData.name)}
                                </h4>
                            </div>
                        )}
                    </div>
                </div>


                <div className={`
                    mt-4 p-4 mx-6 shadow-xl rounded-xl border text-black dark:text-gray-300 border-gray-200/50 dark:border-gray-600/50
                    ${pokemonSpecies?.is_legendary
                        ? 'bg-legendary glow-legendary'
                        : pokemonSpecies?.is_mythical
                            ? 'bg-mythical glow-mythical'
                            : 'bg-white dark:bg-slate-800'
                    }`}>
                    <PokedexEntryComponent entries={entries} />
                </div>

                {evolutionChainList && evolutionChainList.length > 1 && (
                    <div className={`
                    p-[1rem] pb-0 my-4 mx-6 shadow-xl rounded-xl border text-black dark:text-gray-300 border-gray-200/50 dark:border-gray-600/50
                    ${pokemonSpecies?.is_legendary
                            ? 'bg-legendary glow-legendary'
                            : pokemonSpecies?.is_mythical
                                ? 'bg-mythical glow-mythical'
                                : 'bg-white dark:bg-slate-800'
                        }
                    `}>
                        <h3 className="text-xl font-bold">Evolution chain</h3>
                        <EvolutionChainComponent chain={evolutionChainList} onSelect={setIdFromParent} />
                    </div>
                )}


                {varietiesList && varietiesList.length > 1 && (
                    <div className={`
                        p-[1rem] pb-0 my-[1rem] mx-6 shadow-xl rounded-xl border text-black dark:text-gray-300  border-gray-200/50 dark:border-gray-600/50
                        ${pokemonSpecies?.is_legendary
                            ? 'bg-legendary glow-legendary'
                            : pokemonSpecies?.is_mythical
                                ? 'bg-mythical glow-mythical'
                                : 'bg-white dark:bg-slate-800'
                        }
                    `}>
                        <h3 className="text-xl font-bold">Varieties</h3>
                        <EvolutionChainComponent chain={varietiesList} onSelect={setIdFromParent} />
                    </div>
                )}


                <div className={`
                    p-[1rem] my-[1rem] mx-6 shadow-xl rounded-xl border text-black dark:text-gray-300 border-gray-200/50 dark:border-gray-600/50
                    ${pokemonSpecies?.is_legendary
                        ? 'bg-legendary glow-legendary'
                        : pokemonSpecies?.is_mythical
                            ? 'bg-mythical glow-mythical'
                            : 'bg-white dark:bg-slate-800'
                    }
                    `}>
                    <h3 className="text-xl font-bold mb-[1rem]">Information</h3>
                    <div className="flex flex-row justify-evenly">
                        <div className="flex flex-col text-center">
                            <h5 className="text-gray-500 dark:text-gray-400">Height</h5>
                            <span className="bold">{pokemonData?.height ? pokemonData?.height / 10 : 0} m</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <h5 className="text-gray-500 dark:text-gray-400">Weight</h5>
                            <span className="bold">{pokemonData?.weight ? pokemonData?.weight / 10 : 0} kg</span>
                        </div>
                    </div>
                </div>

                <div className={`
                p-[1rem] my-[1rem] mx-6 shadow-xl rounded-xl border text-black dark:text-gray-300 border-gray-200/50 dark:border-gray-600/50
                ${pokemonSpecies?.is_legendary
                        ? 'bg-legendary glow-legendary'
                        : pokemonSpecies?.is_mythical
                            ? 'bg-mythical glow-mythical'
                            : 'bg-white dark:bg-slate-800'
                    }
                `}>
                    <h3 className="text-xl font-bold mb-[1rem]">Types</h3>
                    <div className="flex flex-row gap-2">
                        {pokemonTypes}
                    </div>
                </div>

                <div className={`
                p-[1rem] my-[1rem] mx-6 shadow-xl rounded-xl border text-black dark:text-gray-300 bg-white dark:bg-slate-800 border-gray-200/50 dark:border-gray-600/50 mb-20
                ${pokemonSpecies?.is_legendary
                        ? 'bg-legendary glow-legendary'
                        : pokemonSpecies?.is_mythical
                            ? 'bg-mythical glow-mythical'
                            : 'bg-white dark:bg-slate-800'
                    }
                `}>
                    <h3 className="text-xl font-bold mb-[1rem]">Stats</h3>
                    {statComponents}
                </div>
            </div>
        );
    }
};

export default PokemonCardComponent;

"use client";
import { useEffect, useState } from "react";
import { getPokemonById, getArtworkById, getSprite, getShinyArtworkById } from "../../services/pokemon.service";
import { Pokemon } from "../../models/dto/pokemon.model";
import { Species } from "../../models/dto/species.model";
import { EvolutionChain } from "../../models/dto/evolution-chain.model";
import { Generic } from "../../models/dto/generic.model";
import EvolutionChainComponent from "./pokemon/evolution-chain.component";
import { EvolutionStage } from "../../models/evolution-stage.model";
import PokedexEntryComponent from "./pokemon/pokedex-entry.component";
import { usePokemon } from "../../context/pokemonContext";
import { MovesList } from "./pokemon/move-list.component";
import { GenericCardContainerComponent } from "./pokemon/generic-card-container.component";
import { InformationComponent } from "./pokemon/information.component";
import { ArtworkContainerComponent } from "./pokemon/artwork-container.component";
import { StatsComponent } from "./pokemon/stats.component";
import { EvolutionNode } from "@/app/models/evolution-node.model";
import { TagsContainerComponent } from "./pokemon/tags.component";
import { AbilitiesList } from "./pokemon/ability-list.component";
import { ServerCrash } from "lucide-react";
import { EvolutionTrigger } from "@/app/models/evolution-trigger.model";
import EvolutionTriggers from "./pokemon/evolution-triggers.component";
import { Stat } from "@/app/models/dto/stat.model";
import { Type } from "@/app/models/dto/type.model";
import { HeldItemsList } from "./pokemon/held-items.list";

const PokemonCardComponent: React.FC = () => {
    const { setTier, selectedId, isLoadingPokemon, clearPokemonCard } = usePokemon();
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonSpecies, setPokemonSpecies] = useState<Species | null>(null);
    const [pokemonArtwork, setPokemonArtwork] = useState<string[]>([]);
    const [pokemonEvolution, setPokemonEvolution] = useState<EvolutionChain | null>(null);
    const [evolutionChainList, setEvolutionChainList] = useState<EvolutionStage[]>([]);
    const [evolutionTriggerList, setEvolutionTriggerList] = useState<EvolutionTrigger[]>([]);
    const [varietiesList, setVarietiesList] = useState<EvolutionStage[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasFailed, setHasFailed] = useState(false);

    useEffect(() => {
        if (!selectedId) return;
        setLoading(true);
        let objectUrlTemp: string | null = null;
        const artworks: string[] = [];

        const fetchAllData = async () => {
            try {
                const pokemon = await getPokemonById(selectedId);
                const [species] = await Promise.all([
                    fetch(pokemon.species.url).then(res => res.json()),
                ]);

                const blob = await getArtworkById(pokemon.id);
                objectUrlTemp = URL.createObjectURL(blob);

                artworks.push(objectUrlTemp);

                const blobShiny = await getShinyArtworkById(pokemon.id);
                objectUrlTemp = URL.createObjectURL(blobShiny);

                artworks.push(objectUrlTemp);

                setPokemonData(pokemon);
                setPokemonSpecies(species);
                setPokemonArtwork(artworks);

                if (species && pokemon && !pokemon.stats.some((s: Stat) => s.stat.name === "base happiness")) {
                    pokemon.stats = [
                        ...pokemon.stats,
                        {
                            base_stat: species.base_happiness,
                            effort: 0,
                            stat: {
                                name: "base happiness",
                                url: ""
                            }
                        }
                    ];
                }

                if (species && pokemon) {
                    const newTags: string[] = [
                        ...pokemon.types.map((t: Type) => (t.type.name)) ?? "",
                        ...species.egg_groups.map((e: unknown) => (e as { name: string }).name) ?? "",
                        species.color.name ?? "",
                        species.shape.name ?? ""
                    ]
                    if (species.habitat !== null) {
                        if (species.habitat.name) {
                            newTags.push(species.habitat.name);
                        }
                    }
                    setTags(newTags);
                }

                console.log(pokemon);
                console.log(species);

                if (species.evolution_chain.url) {
                    const evolutionRes = await fetch(species.evolution_chain.url);
                    const evolutionData = await evolutionRes.json();
                    setPokemonEvolution(evolutionData);
                }

            } catch (error) {
                console.error("Error fetching pokemon data:", error);
                setHasFailed(true);
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
    }, [selectedId]);

    useEffect(() => {
        if (pokemonSpecies?.is_legendary) {
            setTier("legendary");
        } else if (pokemonSpecies?.is_mythical) {
            setTier("mythical");
        } else {
            setTier("normal");
        }
    }, [pokemonSpecies, setTier]);

    /**
     * Effect to fetch the evolution chain and evolution triggers
     */
    useEffect(() => {
        if (pokemonEvolution) {
            const evolutionChainList = flattenEvolutionChain(pokemonEvolution.chain);
            const evolutionDetailList = extractEvolutionDetails(pokemonEvolution);

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
                setEvolutionTriggerList(evolutionDetailList);
            });
        }
    }, [pokemonEvolution]);

    useEffect(() => {
        if (pokemonSpecies && pokemonSpecies.varieties.length > 1) {
            const allVarieties = [...pokemonSpecies.varieties];
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


    /**
     * creates a vector with the names and urls from the evolution chain
     * @param chain 
     * @returns 
     */
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

    const extractEvolutionDetails = (evolutionChain: EvolutionChain): EvolutionTrigger[] => {
        const result: EvolutionTrigger[] = [];

        const traverse = (node: EvolutionNode) => {
            if (!node) return;

            for (const evolution of node.evolves_to) {
                if (evolution.evolution_details) {
                    for (const detail of evolution.evolution_details) {
                        result.push({
                            babyTriggerItem: evolutionChain.baby_trigger_item
                            ? {
                                name: evolutionChain.baby_trigger_item.name,
                                url: evolutionChain.baby_trigger_item.url
                            }
                            : null,
                            evolvesFrom: node.species.name ?? "",
                            evolvesTo: evolution.species.name ?? "",
                            minLevel: detail.min_level,
                            trigger: detail.trigger?.name ?? '',
                            item: detail.item
                                ? {
                                    name: detail.item.name,
                                    url: detail.item.url,
                                }
                                : null,
                            heldItem: detail.held_item
                                ? {
                                    name: detail.held_item.name,
                                    url: detail.held_item.url
                                }
                                : null,
                            daytime: detail.time_of_day,
                            minHappiness: detail.min_happiness !== null ? +detail.min_happiness : 0,
                            location: detail.location ?? null,
                            minAffection: detail.min_affection !== null ? +detail.min_affection : 0,
                            knownMoveType: detail.known_move_type
                                ? {
                                    name: detail.known_move_type.name,
                                    url: detail.known_move_type.url
                                }
                                : null,
                            knowMove: detail.known_move
                                ? {
                                    name: detail.known_move.name,
                                    url: detail.known_move.url
                                }
                                : null,
                            partySpecies: detail.party_species
                            ? {
                                name: detail.party_species.name,
                                url: detail.party_species.url
                            }
                            : null
                        });
                    }
                    traverse(evolution);
                }
            }
        };

        traverse(evolutionChain.chain);
        return result;
    };

    if (selectedId === null) {
        return (
            <div className="h-[40rem] w-full flex items-center justify-center text-gray-500">
                <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold">Select a Pokémon</h2>
                    <p className="text-sm">Click on a item from the list to view the details</p>
                </div>
            </div>
        );
    } else if (isLoadingPokemon || loading) {
        return (
            <div className="h-[40rem] max-w-sm mx-auto w-full flex items-center justify-center">
                <div className="animate-pulse w-full p-4 space-y-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto" />
                    <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mx-auto" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto" />
                </div>
            </div>
        );
    } else if (hasFailed) {
        return (
            <div className="h-[40rem] max-w-sm mx-auto w-full flex flex-col items-center justify-center">
                <div className="flex flex-col gap-4 text-center text-black dark:text-gray-200">
                    <div className="flex justify-center w-full">
                        <ServerCrash className="w-6 h-6 text-gray-400" />
                    </div>
                    <h1 className="font-bold text-xl">Error</h1>
                    <p className="px-4">An error occurred while fetching the Pokémon data. Please try again later</p>
                    <div className="p-4">
                        <button
                            onClick={clearPokemonCard}
                            className="rounded-lg border border-gray-200/50 dark:border-gray-600/50 w-full 
                        bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 
                        hover:scale-105 transition-all duration-300
                        p-2 text-white cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="max-w-md mx-auto">
                {pokemonData &&
                    <ArtworkContainerComponent
                        id={selectedId}
                        name={pokemonData?.name ?? ''}
                        pokemonArtwork={pokemonArtwork}
                        cries={pokemonData.cries}
                    />
                }

                {pokemonSpecies &&
                    <GenericCardContainerComponent>
                        <PokedexEntryComponent entries={pokemonSpecies?.flavor_text_entries} />
                    </GenericCardContainerComponent>
                }

                {pokemonData &&
                    <GenericCardContainerComponent title="information">
                        <InformationComponent id={selectedId} height={pokemonData?.height} weight={pokemonData?.weight} />
                    </GenericCardContainerComponent>
                }

                {evolutionChainList && evolutionChainList.length > 1 && (
                    <GenericCardContainerComponent title="evolution chain">
                        <EvolutionChainComponent chain={evolutionChainList} type={"evolution"} />
                    </GenericCardContainerComponent>
                )}

                {evolutionTriggerList && evolutionTriggerList.length > 0 && (
                    <GenericCardContainerComponent title="evolution triggers">
                        <EvolutionTriggers evolutionChain={evolutionTriggerList} />
                    </GenericCardContainerComponent>
                )}

                {varietiesList && varietiesList.length > 1 && (
                    <GenericCardContainerComponent title="varieties">
                        <EvolutionChainComponent chain={varietiesList} type={"varietie"} />
                    </GenericCardContainerComponent>
                )}

                {pokemonData && pokemonData.held_items.length > 0 &&
                    <GenericCardContainerComponent title="held items">
                        <HeldItemsList pokemonData={pokemonData} />
                    </GenericCardContainerComponent>
                }

                <GenericCardContainerComponent title="tags">
                    <TagsContainerComponent tags={tags} />
                </GenericCardContainerComponent>

                {pokemonData?.stats &&
                    < GenericCardContainerComponent title="stats">
                        <StatsComponent stats={pokemonData?.stats} />
                    </GenericCardContainerComponent>
                }

                {pokemonData?.moves && pokemonData?.moves.length > 0 && (
                    <GenericCardContainerComponent title="moves">
                        <MovesList pokemonData={pokemonData} />
                    </GenericCardContainerComponent>
                )}

                {pokemonData?.abilities && pokemonData.abilities.length > 0 && (
                    <div className="mb-20">
                        <GenericCardContainerComponent title="abilities">
                            <AbilitiesList pokemonData={pokemonData} />
                        </GenericCardContainerComponent>
                    </div>
                )}
            </div>
        );
    }
};

export default PokemonCardComponent;

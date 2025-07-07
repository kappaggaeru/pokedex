"use client";
import { useEffect, useState } from "react";
import { getPokemonById, getArtworkById, getSprite, getShinyArtworkById } from "../../services/pokemon.service";
import { Pokemon } from "../../models/dto/pokemon.model";
import { Species } from "../../models/dto/species.model";
import { Form } from "../../models/dto/form.model";
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
import { TypesContainerComponent } from "./pokemon/types.component";
import { AbilitiesList } from "./pokemon/ability-list.component";

const PokemonCardComponent: React.FC = () => {
    const { setTier, selectedId, isLoadingPokemon } = usePokemon();
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonSpecies, setPokemonSpecies] = useState<Species | null>(null);
    const [pokemonForm, setPokemonForm] = useState<Form | null>(null);
    const [pokemonArtwork, setPokemonArtwork] = useState<string[]>([]);
    const [pokemonEvolution, setPokemonEvolution] = useState<EvolutionChain | null>(null);
    const [evolutionChainList, setEvolutionChainList] = useState<EvolutionStage[]>([]);
    const [varietiesList, setVarietiesList] = useState<EvolutionStage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedId) return;
        setLoading(true);
        let objectUrlTemp: string | null = null;
        const artworks: string[] = [];

        const fetchAllData = async () => {
            try {
                const pokemon = await getPokemonById(selectedId);
                const [species, form] = await Promise.all([
                    fetch(pokemon.species.url).then(res => res.json()),
                    fetch(pokemon.forms[0].url).then(res => res.json())
                ]);

                const blob = await getArtworkById(pokemon.id);
                objectUrlTemp = URL.createObjectURL(blob);

                artworks.push(objectUrlTemp);

                const blobShiny = await getShinyArtworkById(pokemon.id);
                objectUrlTemp = URL.createObjectURL(blobShiny);

                artworks.push(objectUrlTemp);

                setPokemonData(pokemon);
                setPokemonSpecies(species);
                setPokemonForm(form);
                setPokemonArtwork(artworks);

                console.log(pokemon);
                console.log(species);
                console.log(form);

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
    } else {
        return (
            <div className="max-w-md mx-auto">
                {pokemonData &&
                    <ArtworkContainerComponent id={selectedId} name={pokemonData?.name ?? ''} pokemonArtwork={pokemonArtwork} cries={pokemonData.cries} />
                }

                {pokemonSpecies &&
                    <GenericCardContainerComponent>
                        <PokedexEntryComponent entries={pokemonSpecies?.flavor_text_entries} />
                    </GenericCardContainerComponent>
                }

                {evolutionChainList && evolutionChainList.length > 1 && (
                    <GenericCardContainerComponent title="evolution chain">
                        <EvolutionChainComponent chain={evolutionChainList} />
                    </GenericCardContainerComponent>
                )}

                {varietiesList && varietiesList.length > 1 && (
                    <GenericCardContainerComponent title="varieties">
                        <EvolutionChainComponent chain={varietiesList} />
                    </GenericCardContainerComponent>
                )}

                {pokemonData &&
                    <GenericCardContainerComponent title="information">
                        <InformationComponent id={selectedId} height={pokemonData?.height} weight={pokemonData?.weight} />
                    </GenericCardContainerComponent>
                }

                {pokemonForm &&
                    <GenericCardContainerComponent title="types">
                        <TypesContainerComponent types={pokemonForm?.types ?? []} />
                    </GenericCardContainerComponent>
                }

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

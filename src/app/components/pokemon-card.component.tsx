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

    useEffect(() => {
        if (!id) return;

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

    const pokemonTypes = pokemonForm?.types.map((type, index) =>
        <span key={index}>
            {type.type.name}
            {index < pokemonForm.types.length - 1 && ', '}
        </span>
    );

    if (id === null) {
        return (
            <div className="h-full w-full flex items-center justify-center text-gray-500 ">
                <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold">Selecciona un Pokémon</h2>
                    <p className="text-sm">Haz clic en uno de la lista para ver sus detalles.</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="relative h-full w-full">
                <CloseButton onClick={clearCard} isVisible={true} />

                {pokemonSpecie &&
                    <div className="w-full flex flex-row justify-between items-center text-black pr-[1rem] pl-[1rem]">
                        <h4 className="text-3xl uppercase">{pokemonSpecie.name}</h4>
                        <span>{pokemonSpecie.id}</span>
                    </div>
                }

                {pokemonForm &&
                    <div className="w-full h-fit flex justify-center items-center">
                        <PokemonArtworkComponent id={id} artworkUrl={pokemonArtwork} />
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

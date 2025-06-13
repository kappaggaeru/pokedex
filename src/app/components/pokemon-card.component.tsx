import { useEffect, useState } from "react"
import { Species } from "../models/dto/species-model"
import { getPokemonById, getPokemonFormById, getPokemonSpeciesById } from "../services/pokemon.service";
import { Form } from "../models/dto/form-model";
import { Pokemon } from "../models/dto/pokemon-model";
import PokemonArtworkComponent from "./artwork.component";
import { PokemonCardProps } from "../models/props/pokedex-card-props";
import { StatBar } from "./stat-bar.component";
import { StatBarProps } from "../models/props/pokedex-stat-props";

const PokemonCardComponent: React.FC<PokemonCardProps> = ({ id, toggleCard }) => {
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonSpecie, setPokemonSpecie] = useState<Species | null>(null);
    const [pokemonForm, setPokemonForm] = useState<Form | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fechtPokemonData = async () => {
            try {
                setLoading(true);
                await setPokemon(id);
                await setSpecies(id);
                await setForm(id);
                setMounted(true);
                setError(null);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error('Unexpected error'));
                }
            } finally {
                setLoading(false);
            }
        };

        fechtPokemonData();

    }, [id]);

    async function setPokemon(id: number) {
        const data = await getPokemonById(id);
        setPokemonData(data);
        setStats(data);
        console.log(data);
    }

    async function setSpecies(id: number) {
        const data = await getPokemonSpeciesById(id);
        setPokemonSpecie(data);
        console.log(data);
    }

    async function setForm(id: number) {
        const data = await getPokemonFormById(id);
        setPokemonForm(data);
        console.log(data);
    }

    const statsColors: Array<"green" | "red" | "blue" | "violet" | "lightblue" | "yellow"> = [
        "green",
        "red",
        "blue",
        "violet",
        "lightblue",
        "yellow"
    ];

    function setStats(data: Pokemon): StatBarProps[] {
        return data.stats.map((stat, index) => ({
            title: stat.stat.name ?? "",
            value: stat.base_stat,
            color: statsColors[index % statsColors.length]
        }));
    }

    const statComponents = pokemonData
        ? setStats(pokemonData).map((statProps) => (
            <StatBar
                key={statProps.title}
                title={statProps.title}
                value={statProps.value}
                color={statProps.color}
            />
        ))
        : [];

    const pokemonTypes = pokemonForm?.types.map((type, index) =>
        <span key={index}>
            {type.type.name}
            {index < pokemonForm.types.length - 1 && ', '}
        </span>
    );

    if (!mounted) return null;

    return (
        <div className="h-full w-full">
            <button className="py-[.5rem] px-[1.5rem] rounded-md bg-slate-400 text-black md:hidden" onClick={toggleCard}>
                CLOSE
            </button>
            {pokemonSpecie &&
                <div className="w-full flex flex-row justify-between items-center text-black pr-[1rem] pl-[1rem]">
                    <h4 className="text-3xl uppercase">{pokemonSpecie.name}</h4>
                    <span>{pokemonSpecie.id}</span>
                </div>
            }
            {pokemonForm &&
                <div className="w-full h-fit flex justify-center items-center">
                    <PokemonArtworkComponent id={id} />
                </div>
            }
            {pokemonSpecie &&
                <div className="px-[1rem]">
                    <h1 className="text-xl">Stats</h1>
                    {pokemonData &&
                        statComponents
                    }
                </div>
            }
            <div className="w-full h-[5rem] content-center bg-yellow-300 text-black text-center">
                {pokemonTypes}
            </div>
            {pokemonData &&
                <div className="w-full h-[5rem] content-center bg-red-300 text-black text-center">
                    {pokemonData.height}
                </div>
            }
        </div>
    );
}

export default PokemonCardComponent;
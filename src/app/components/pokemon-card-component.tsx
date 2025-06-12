import { useEffect, useState } from "react"
import { Species } from "../models/species-model"
import { getPokemonById, getPokemonFormById, getPokemonSpeciesById, getPokemonTotalCount } from "../services/pokemon.service";
import { GenericWrapper } from "../models/generic-wrapper-model";
import { Form } from "../models/form-model";
import { Pokemon } from "../models/pokemon-model";
import PokemonArtworkComponent from "./artwork-component";
import { PokemonCardProps } from "../models/pokedex-card-props";

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

    const pokemonTypes = pokemonForm?.types.map((type, index) =>
        <span key={index}>
            {type.type.name}
            {index < pokemonForm.types.length - 1 && ', '}
        </span>
    );

    if (!mounted) return null;

    return (
        <div className="overflow-auto">
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
                <div className="w-full h-[5rem] content-center bg-green-300 text-black text-center">
                    <p>base happiness: {pokemonSpecie.base_happiness}</p>
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
            <div className="md:hidden">
                <button className="py-[.5rem] px-[1.5rem] rounded-md bg-slate-400 text-black" onClick={toggleCard}>CLOSE</button>
            </div>
            <div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia minus modi qui vitae velit illum incidunt a repellat eveniet aliquam quas, cum saepe sint, tenetur ullam possimus. Ipsa, eum doloremque.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, pariatur reiciendis voluptates in aliquam molestias eveniet vitae explicabo harum rem iste facere debitis, eaque deserunt accusamus fugit, neque illum? Laudantium.</p>
            </div>
        </div>
    );
}

export default PokemonCardComponent;
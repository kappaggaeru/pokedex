import { useEffect, useState } from "react"
import { Species } from "../models/species-model"
import { getPokemonById, getPokemonFormById, getPokemonSpeciesById, getPokemonTotalCount } from "../services/pokemon.service";
import { GenericWrapper } from "../models/generic-wrapper-model";
import { Form } from "../models/form-model";
import { Pokemon } from "../models/pokemon-model";
import PokemonArtworkComponent from "./artwork-component";

interface Props {
    id: number
}

const PokemonCardComponent: React.FC<Props> = ({ id }) => {
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [pokemonSpecie, setPokemonSpecie] = useState<Species | null>(null);
    const [pokemonForm, setPokemonForm] = useState<Form | null>(null);

    const [pokemonCount, setPokemonCount] = useState<GenericWrapper | null>(null);
    const [currentId, setCurrentId] = useState<number>(0);
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

    // it seems to be a problem fetching the total pokemon count so i hardcode it
    // const randomId = getRandomNumberBetweenRange(1, pokemonCount?.count ? pokemonCount?.count : 0);

    const handleFetch = async () => {
        try {
            setLoading(true);
            const random = getRandomNumberBetweenRange(1, 1025);
            setCurrentId(random);
            setPokemon(random);
            setSpecies(random);
            setForm(random);
            // setArtwork(random);
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

    function getRandomNumberBetweenRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    const getTotalPokemonCount = async () => {
        try {
            const data = await getPokemonTotalCount();
            setPokemonCount(data);
            console.log(data);
            setError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error('Unexpected error'));
            }
        }
    }

    const pokemonTypes = pokemonForm?.types.map((type, index) =>
        <span key={index}>
            {type.type.name}
            {index < pokemonForm.types.length - 1 && ', '}
        </span>
    );

    if (!mounted) return null;

    return (
        <div >
            {pokemonSpecie &&
                <div className="w-full flex flex-row justify-between items-center text-black pr-[1rem] pl-[1rem] border-2 border-green-400 border-dashed">
                    <h4 className="text-3xl">{pokemonSpecie.name}</h4>
                    <span>{pokemonSpecie.id}</span>
                </div>
            }
            {pokemonForm &&
                <div className="w-full h-[10rem] content-center text-center bg-blue-400 text-black">
                    {/* <img src={pokemonForm.sprites.front_default} alt="" /> */}
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
            {/* <div>
                <p>Total amount of pokemon: {pokemonCount?.count}</p>
                <p>ID: {currentId}</p>
            </div>
            <h2>pokemon species</h2>
            <button onClick={handleFetch} disabled={loading} style={{ padding: '1rem', border: '2px #000 solid', borderRadius: '10px', backgroundColor: 'coral' }}>
                {loading ? 'Loading...' : 'Fetch random pokemon'}
            </button>

            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

            {pokemonSpecie && pokemonForm && pokemonData && (
                <div>
                    <h1>name: {pokemonSpecie.name}</h1>
                    <p>id: {pokemonSpecie.id}</p>
                    <p>base happiness: {pokemonSpecie.base_happiness}</p>
                    <p>color: {pokemonSpecie.color.name}</p>
                    <p>legendary: {pokemonSpecie.is_legendary ? 'yes' : 'no'}</p>
                    <p>types: {pokemonTypes}</p>
                    <p>height: {pokemonData.height}</p>
                </div>
            )}

            {pokemonForm && (
                <div>
                    <img src={pokemonForm.sprites.front_default} alt="" />
                </div>
            )}

            <PokemonArtworkComponent id={currentId} /> */}
        </div>
    );
}

export default PokemonCardComponent;
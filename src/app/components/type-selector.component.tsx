import { useEffect, useState } from "react"
import { getPokemonTypes } from "../services/pokemon.service";
import { GenericWrapper } from "../models/dto/generic-wrapper.model";
import { Generic } from "../models/dto/generic.model";

const TypeSelectorComponent: React.FC = () => {
    const [types, setTypes] = useState<GenericWrapper | null>(null);
    const [error, setError] = useState<string | null>(null);

    // useEffect es el init de angular, se ejecuta cuando el componente se monta
    useEffect(() => {
        getPokemonTypes()
            .then(data => setTypes(data))
            .catch(error => setError(error.message));
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!types) return <p>Loading...</p>;

    console.log(types);

    return (
        <div>
            <h1>Types</h1>
            <select name="type-selector" id="typeSelector">
                {types.results.map((pokemon: Generic) => (
                    <option key={pokemon.name} value={pokemon.name}>
                        {pokemon.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TypeSelectorComponent;
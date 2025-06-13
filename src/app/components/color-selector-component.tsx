import { useEffect, useState } from "react";
import { GenericWrapper } from "../models/dto/generic-wrapper-model";
import { getPokemonColors } from "../services/pokemon.service";
import { Generic } from "../models/dto/generic-model";

const ColorSelectorComponent: React.FC = () => {
    const [colors, setColors] = useState<GenericWrapper | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPokemonColors()
            .then(data => setColors(data))
            .catch(error => setError(error.message));
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!colors) return <p>Loading...</p>;

    console.log(colors);

    return (
        <div>
            <h1>Colors</h1>
            <select name="color-selector" id="color-selector">
                {colors.results.map((color: Generic) => (
                    <option key={color.name} value={color.name}>
                        {color.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ColorSelectorComponent;
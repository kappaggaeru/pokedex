import { useEffect, useState } from "react";
import { getArtwork } from "../services/pokemon.service";

const PokemonArtworkComponent = ({ id }: { id: number }) => {
    const [pokemonArtwork, setPokemonArtwork] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const blob = await getArtwork(id);
                const objectURL = URL.createObjectURL(blob);
                setPokemonArtwork(objectURL);
            } catch (error) {
                console.log(error);
            }
        };
        fetchArtwork();
        return () => {
            if (pokemonArtwork) {
                URL.revokeObjectURL(pokemonArtwork);
            }
        };
    }, [id]);

    return (
        <div>
            {pokemonArtwork ? (
                <img src={pokemonArtwork} alt={`Pokemon ${id}`} className="h-[15rem]"/>
            ) : (
                <p>Loading artwork...</p>
            )}
        </div>
    );
};

export default PokemonArtworkComponent;
import { useEffect, useState } from "react";
import { getArtwork } from "../services/pokemon.service";
import Image from "next/image";

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
                <Image src={pokemonArtwork} alt={`Pokemon ${id}`} className="h-[15rem]" width={200} height={200}/>
            ) : (
                <p>Loading artwork...</p>
            )}
        </div>
    );
};

export default PokemonArtworkComponent;
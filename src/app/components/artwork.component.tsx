import Image from "next/image";

const PokemonArtworkComponent = ({ artworkUrl, id }: { artworkUrl: string | null, id: number }) => {
    return (
        <div>
            {artworkUrl ? (
                <Image
                    src={artworkUrl}
                    alt={`Pokemon ${id}`}
                    className="h-[15rem]"
                    width={200}
                    height={200}
                />
            ) : (
                <p>Loading artwork...</p>
            )}
        </div>
    );
};

export default PokemonArtworkComponent;

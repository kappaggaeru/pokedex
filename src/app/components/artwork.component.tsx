const PokemonArtworkComponent = ({ artworkUrl, id }: { artworkUrl: string | null, id: number }) => {
    return (
        <div className="border border-black rounded w-full bg-blue-200 flex justify-center">
            {artworkUrl ? (
                <img
                    src={artworkUrl}
                    alt={`Pokemon ${id}`}
                    className="object-cover h-[10rem]"
                />
            ) : (
                <p>Loading artwork...</p>
            )}
        </div>
    );
};

export default PokemonArtworkComponent;

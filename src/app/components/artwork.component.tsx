const PokemonArtworkComponent = ({ artworkUrl, id }: { artworkUrl: string | null, id: number }) => {
    return (
        <div 
            className="rounded-lg w-full flex justify-center bg-[#207b55] dark:bg-[#012d1b] ring-1 ring-gray-500/50"
            style={{
                backgroundImage: `
                    repeating-linear-gradient(
                        to right,
                        rgba(255, 165, 100, 0.2) 0px,
                        rgba(255, 165, 100, 0.2) 1px,
                        transparent 1px,
                        transparent 20px
                    ),
                    repeating-linear-gradient(
                        to bottom,
                        rgba(255, 165, 100, 0.2) 0px,
                        rgba(255, 165, 100, 0.2) 1px,
                        transparent 1px,
                        transparent 20px
                    )
                `,
            }}
            >
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

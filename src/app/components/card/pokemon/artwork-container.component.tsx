import { ArtworkContainerProps } from "@/app/models/props/artwork-container.props";
import PokemonArtworkComponent from "./artwork.component";
import { usePokemon } from "@/app/context/pokemonContext";
import { formatText } from "@/app/utils/stringUtils";
import DefaultButton from "@/app/buttons/default.button";
import { X } from "lucide-react";
import { CryComponent } from "./cry.component";
import { ShineComponent } from "./shine-component";

export const ArtworkContainerComponent: React.FC<ArtworkContainerProps> = ({ id, name, pokemonArtwork, cries }) => {
    const { clearPokemonCard } = usePokemon();
    const { tier } = usePokemon();

    return (
        <div>
            <div className="flex flex-row justify-between items-baseline mx-6">
                <div>
                    <div className="flex flex-row gap-4">
                        <CryComponent cries={cries} />
                        <ShineComponent />
                    </div>
                </div>
                <DefaultButton onClick={clearPokemonCard} isVisible={true} icon={X} className="z-10" />
            </div>
            <div className={`
                relative h-fit flex flex-col justify-center items-center px-[1rem] pt-[1rem] my-[1rem] mb-0 mx-6 rounded-xl border shadow-xl transition-all duration-300
                before:absolute before:inset-0 before:rounded-xl before:blur-md before:z-[-1]
                ${tier == "legendary" ? 'border-yellow-400 dark:border-yellow-600 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-300 dark:from-yellow-700 dark:via-yellow-800 dark:to-yellow-600 before:animate-glow-yellow'
                    : tier == "mythical" ? 'border-gray-400 dark:border-gray-500 bg-gradient-to-r from-gray-200 via-white to-gray-300 dark:from-slate-600 dark:via-slate-700 dark:to-slate-500 before:animate-glow-silver'
                        : 'border-gray-200/50 dark:border-gray-600/50 bg-white dark:bg-slate-800'
                }`}
            >

                {(tier == "legendary" || tier == "mythical") && (
                    <div
                        className={`
                        absolute top-0 left-0 py-1 px-4 rounded-tl-xl rounded-br-xl 
                        text-xs uppercase text-white font-semibold backdrop-blur-sm 
                        bg-gradient-to-r ${tier == "legendary" ? 'from-yellow-400/70 to-yellow-600/70' : 'from-gray-400/70 to-gray-600/70'
                            }`}
                    >
                        {tier == "legendary" ? "legendary" : "mythical"}
                    </div>
                )}

                <div className="flex flex-row justify-center mb-[1rem] gap-4">
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
                    </span>
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
                    </span>
                </div>

                <PokemonArtworkComponent id={id} artworkUrl={pokemonArtwork} />

                <div className="flex flex-row items-center w-full justify-between">
                    <div className="flex justify-end w-full items-center space-x-2 my-[0.3rem]">
                        <span className="text-md text-gray-400">#{id}</span>
                        <h4 className="text-xl uppercase text-black dark:text-gray-300">
                            {formatText(name, "-")}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
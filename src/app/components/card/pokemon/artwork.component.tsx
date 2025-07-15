import Image from "next/image";
import { useAccesibility } from "@/app/context/accesibilityContext";

const PokemonArtworkComponent = ({ artwork, id, showOriginal }: { artwork: string[], id: number, showOriginal: boolean }) => {
    const { enabledAnimations } = useAccesibility();

    const animatedBackground = enabledAnimations
        ? {
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
            backgroundSize: `20px 20px`,
            animation: "move-grid 2s linear infinite",
        }
        : {
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
            backgroundSize: `20px 20px`,
        };

    return (
        <div className="relative overflow-hidden rounded-lg w-full bg-[#207b55] dark:bg-[#012d1b] ring-1 ring-gray-500/50">
            <div
                className="absolute top-0 left-0 w-[200%] h-[200%] pointer-events-none"
                style={animatedBackground}
            />
            <div className="relative w-full aspect-[3/4] h-[10rem] z-10">
                <Image
                    src={showOriginal ? artwork[0] : artwork[1]}
                    alt={`Pokemon ${id}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                />
            </div>
        </div>
    );
};

export default PokemonArtworkComponent;

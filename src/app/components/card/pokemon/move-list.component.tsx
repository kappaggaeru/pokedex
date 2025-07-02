import { MoveProps } from "@/app/models/props/move.props";
import { getByUrl } from "@/app/services/pokemon.service";
import { useEffect, useMemo, useState } from "react";
import { MoveComponent } from "./move.component";
import { Pokemon } from "@/app/models/dto/pokemon.model";
import { Generic } from "@/app/models/dto/generic.model";
import { Effect } from "@/app/models/dto/effect.model";
import { Flavor } from "@/app/models/dto/flavor.model";
import { useLanguage } from "@/app/context/languageContext";

export const MovesList = ({ pokemonData }: { pokemonData: Pokemon }) => {
    const { language } = useLanguage();
    const [allMoves, setAllMoves] = useState<MoveProps[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchMoves = async () => {
            if (!pokemonData?.moves) return;

            const selectedMoves = pokemonData.moves.slice(0, 20); // ahora los primeros 20

            const moveDetails = await Promise.all(
                selectedMoves.map(async (moveObj: { move: Generic }) => {
                    try {
                        const moveData = await getByUrl(moveObj.move.url);

                        const effectEntry = moveData.effect_entries.find(
                            (entry: Effect) => entry.language.name === language
                        );

                        const flavorText = moveData.flavor_text_entries.find(
                            (entry: Flavor) => entry.language.name === language
                        );

                        const formattedMove: MoveProps = {
                            name: moveData.name,
                            accuracy: moveData.accuracy ?? 0,
                            effect: effectEntry?.short_effect ?? "",
                            effectChance: moveData.effect_chance ?? 0,
                            description: flavorText?.flavor_text ?? "",
                            power: moveData.power ?? 0,
                            type: moveData.type.name,
                        };

                        return formattedMove;

                    } catch (error) {
                        console.error("Error fetching move:", error);
                        return null;
                    }
                })
            );

            setAllMoves(moveDetails.filter((move): move is MoveProps => move !== null));
        };

        fetchMoves();
    }, [pokemonData, language]);

    const visibleMoves = useMemo(() => {
        if (allMoves.length === 0) return [];

        const result: MoveProps[] = [];

        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % allMoves.length;
            result.push(allMoves[index]);
        }

        return result;
    }, [allMoves, currentIndex]);


    const handlePrev = () => {
        setCurrentIndex((prev) =>
            (prev - 3 + allMoves.length) % allMoves.length
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            (prev + 3) % allMoves.length
        );
    };

    const total = allMoves.length;
    const start = currentIndex + 1;
    const end = currentIndex + 3 > total ? ((currentIndex + 3 - 1) % total) + 1 : currentIndex + 3;

    const indicatorText = `Showing ${start}–${end > start ? end : total} of ${total}`;

    if (allMoves.length === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                {visibleMoves.map((move, index) => (
                    <MoveComponent
                        key={`${move.name}-${index}`}
                        name={move.name}
                        description={move.description}
                        accuracy={move.accuracy}
                        effect={move.effect}
                        effectChance={move.effectChance}
                        power={move.power}
                        type={move.type}
                    />
                ))}
            </div>

            <div className="text-gray-500 dark:text-gray-300">
                {indicatorText}
            </div>

            <div className="flex justify-end gap-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                <button
                    onClick={handlePrev}
                    className="border border-gray-200/50 dark:border-gray-600/50 py-2 px-4 w-full rounded-xl 
                    hover:scale-110 transition-all duration-300
                    focus:border-indigo-400 focus:dark:border-indigo-500"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="border border-gray-200/50 dark:border-gray-600/50 py-2 px-4 w-full rounded-xl 
                    hover:scale-110 transition-all duration-300
                    focus:border-indigo-400 focus:dark:border-indigo-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

import { MoveProps } from "@/app/models/props/move.props";
import { getByUrl } from "@/app/services/pokemon.service";
import { useEffect, useState } from "react";
import { MoveComponent } from "./moves.component";
import { Pokemon } from "@/app/models/dto/pokemon.model";
import { Generic } from "@/app/models/dto/generic.model";

export const MovesList = ({ pokemonData }: { pokemonData: Pokemon }) => {
    const [moves, setMoves] = useState<MoveProps[]>([]);

    useEffect(() => {
        const fetchMoves = async () => {
            if (!pokemonData?.moves) return;

            const selectedMoves = pokemonData.moves.slice(0, 5);

            const moveDetails = await Promise.all(
                selectedMoves.map(async (moveObj: { move: Generic }) => {
                    try {
                        const moveData = await getByUrl(moveObj.move.url);

                        const englishEffectEntry = moveData.effect_entries.find(
                            (entry: any) => entry.language.name === "en"
                        );

                        const englishFlavorText = moveData.flavor_text_entries.find(
                            (entry: any) => entry.language.name === "en"
                        );
                        const formattedMove: MoveProps = {
                            name: moveData.name,
                            accuracy: moveData.accuracy ?? 0,
                            effect: englishEffectEntry?.short_effect ?? "",
                            effectChance: moveData.effect_chance ?? 0,
                            description: englishFlavorText?.flavor_text ?? "",
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

            setMoves(moveDetails.filter((move): move is MoveProps => move !== null));
        };

        fetchMoves();
    }, [pokemonData]);

    return (
        <div className="flex flex-col gap-4">
            {moves.map((move, index) => (
                <MoveComponent
                    key={index}
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
    );
};

import { usePokemon } from "@/app/context/pokemonContext";
import { EvolutionStage } from "../../../models/evolution-stage.model";
import PokedexLinkContainer from "./pokedex-link-container.component";
import { useAchievements } from "@/app/context/achievementsContext";

type Props = {
    chain: EvolutionStage[];
    type: string;
}

const EvolutionChainComponent: React.FC<Props> = ({ chain, type }) => {
    const { selectPokemon } = usePokemon();
    const { setSpecialAchievement } = useAchievements();
    if (chain.length === 0) return null;

    const handleSelect = (id: number) => {
        if (type == "evolution") {
            setSpecialAchievement(11);
        } else {
            setSpecialAchievement(13);
        }
        selectPokemon(id)
    }

    const evolutionChain = chain.flatMap((stage) => {
        const element = (
            <PokedexLinkContainer
                key={`stage-${stage.id}`}
                id={stage.id}
                name={stage.name}
                sprite={stage.sprite}
                loading={true}
                error={false}
                onSelect={() => handleSelect(stage.id)}
            />
        );

        return [element];
    });
    return (
        <div className="my-4">
            <div className="flex flex-row items-center justify-evenly flex-wrap gap-2">
                {evolutionChain}
            </div>
        </div>
    );
}
export default EvolutionChainComponent;
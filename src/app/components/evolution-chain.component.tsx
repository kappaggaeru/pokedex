import { EvolutionStage } from "../models/evolution-stage.model";
import PokedexLinkContainer from "./pokedex-link-container.component";

type Props = {
    chain: EvolutionStage[];
    onSelect: (id: number) => void;
}

const EvolutionChainComponent: React.FC<Props> = ({ chain, onSelect }) => {
    if (chain.length === 0) return null;

    const evolutionChain = chain.flatMap((stage) => {
        const element = (
            <PokedexLinkContainer key={`stage-${stage.id}`} id={stage.id} name={stage.name} sprite={stage.sprite} onSelect={() => onSelect(stage.id)} />
        );

        return [element];
    });
    return (
        <div className="my-[1rem]">
            <div className="flex flex-row items-center justify-evenly flex-wrap gap-y-2">
                {evolutionChain}
            </div>
        </div>
    );
}
export default EvolutionChainComponent;
import { EvolutionStage } from "../models/evolution-stage.model";

type Props = {
    chain: EvolutionStage[];
    onSelect: (id: number) => void;
}

const EvolutionChainComponent: React.FC<Props> = ({ chain, onSelect }) => {
    if (chain.length === 0) return null;

    const evolutionChain = chain.flatMap((stage) => {
        const element = (
            <div
                key={`stage-${stage.id}`}
                onClick={() => onSelect(stage.id)}
                className="text-center cursor-pointer border border-gray-200/50 flex flex-row items-center rounded-xl"
            >
                <img src={stage.sprite} alt={stage.name} className="w-20 h-20 object-contain" />
            </div>
        );

        return [element];
    });
    return (
        <div className="my-[1rem]">
            <div className="flex flex-row items-center justify-between">
                {evolutionChain}
            </div>
        </div>
    );
}
export default EvolutionChainComponent;
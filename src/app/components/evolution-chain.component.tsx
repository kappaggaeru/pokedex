import { EvolutionStage } from "../models/evolution-stage.model";

type Props = {
    chain: EvolutionStage[];
    onSelect: (id: number) => void;
}

const EvolutionChainComponent: React.FC<Props> = ({ chain, onSelect }) => {
    if (chain.length === 0) return null;

    const evolutionChain = chain.flatMap((stage) => {
        const element = (
            <div key={`stage-${stage.id}`} className="text-center">
                <div
                    onClick={() => onSelect(stage.id)}
                    className="text-center cursor-pointer border dark:bg-slate-700 border-gray-200/50 dark:border-gray-600/50 flex flex-row items-center rounded-xl"
                >
                    <img src={stage.sprite} alt={stage.name} className="w-20 h-20 object-contain" />
                </div>
                <span className="text-sm text-gray-500 capitalize">{stage.name}</span>
            </div>
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
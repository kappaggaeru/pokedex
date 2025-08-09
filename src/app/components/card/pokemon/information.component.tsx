import { getPokemonRegion } from "@/app/helper/region";
import { GenerationProps } from "@/app/models/props/generation.props";
import { InformationProps } from "@/app/models/props/information.props"

export const InformationComponent: React.FC<InformationProps> = ({ id, height, weight }) => {
    const region: GenerationProps = getPokemonRegion(id);
    return (
        <div className="flex flex-row justify-evenly">
            <div className="flex flex-col text-center">
                <h5 className="text-gray-500 dark:text-gray-400">Region</h5>
                <span className="bold text-gray-700">{region.name}</span>
            </div>
            <div className="flex flex-col text-center">
                <h5 className="text-gray-500 dark:text-gray-400">Height</h5>
                <span className="bold text-gray-700">{height / 10} m</span>
            </div>
            <div className="flex flex-col text-center">
                <h5 className="text-gray-500 dark:text-gray-400">Weight</h5>
                <span className="bold text-gray-700">{weight / 10} kg</span>
            </div>
        </div>
    )
}
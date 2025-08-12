import { getPokemonRegion } from "@/app/helper/region";
import { GenerationProps } from "@/app/models/props/generation.props";
import { InformationProps } from "@/app/models/props/information.props"

export const InformationComponent: React.FC<InformationProps> = ({ id, height, weight, captureRate, genderRate }) => {
    const region: GenerationProps = getPokemonRegion(id);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 justify-evenly flex-wrap">
                <div className="flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Region</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">{region.name}</span>
                </div>
                <div className="flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Height</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">{height / 10} m</span>
                </div>
                <div className="flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Weight</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">{weight / 10} kg</span>
                </div>
                <div className="flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Capture Rate</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">{captureRate}</span>
                </div>
                <div className="flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Gender Rate</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">
                        {genderRate !== -1 ? `${(genderRate / 8) * 100}}%` : `Genderless`}
                    </span>
                </div>
            </div>
        </div>
    )
}
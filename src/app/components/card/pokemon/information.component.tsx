import { getPokemonRegion } from "@/app/helper/region";
import { GenerationProps } from "@/app/models/props/generation.props";
import { InformationProps } from "@/app/models/props/information.props"

export const InformationComponent: React.FC<InformationProps> = ({ id, height, weight, captureRate, genderRate }) => {
    const region: GenerationProps = getPokemonRegion(id);
    function renderGenderRate(): string {
        const calc = genderRate / 8;
        if (calc == 1) {
            return 'Always female';
        } else if (calc == 0) {
            return 'Always male';
        } else if (calc < 0) {
            return 'Genderless';
        } else {
            return `${calc * 100}%`;
        }
    }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-evenly">
                <div className="col-span-1 flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Region</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">{region.name}</span>
                </div>
                <div className="col-span-1 flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Height</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">{height / 10} m</span>
                </div>
                <div className="col-span-1 flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Weight</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">{weight / 10} kg</span>
                </div>
            </div>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Capture Rate</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">{captureRate}</span>
                </div>
                <div className="flex flex-col text-center">
                    <h5 className="text-gray-500 dark:text-gray-400">Gender Rate</h5>
                    <span className="bold text-gray-700 dark:text-gray-300">
                        {renderGenderRate()}
                    </span>
                </div>
            </div>
        </div>
    )
}
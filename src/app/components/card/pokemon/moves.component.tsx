import { MoveProps } from "@/app/models/props/move.props";
import { ChipComponent } from "./chip.component";

export const MoveComponent: React.FC<MoveProps> = ({ name, accuracy, effect, effectChance, description, power, type }) => {
    return (
        <div className="rounded-lg border border-gray-200/50 dark:border-gray-600/50 p-4">
            <div className="flex flex-row-reverse gap-4 items-center ">
                <div className="flex flex-col w-full gap-2">
                    <div className="flex flex-row justify-between">
                        <p className="text-lg bold capitalize">{name}</p>
                        <div>
                            <ChipComponent title={type} />
                        </div>
                    </div>
                    <p className="text-gray-600">{description}</p>
                    <span className="text-sm text-gray-400">{effect}</span>
                    <div className="flex flex-row justify-evenly">
                        <div>
                            <span title="accuracy">{accuracy} ACC</span>
                        </div>
                        <div>
                            <span title="power">{power} PWR</span>
                        </div>
                        <div>
                            <span title="effect chance">{effectChance} EFF</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
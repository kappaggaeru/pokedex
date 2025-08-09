import { MoveProps } from "@/app/models/props/move.props";
import { ChipComponent } from "./chip.component";
import { formatText } from "@/app/utils/stringUtils";
import { usePokemon } from "@/app/context/pokemonContext";
import FadeText from "../../text/fade-text.component";

export const MoveComponent: React.FC<MoveProps> = ({ name, accuracy, effect, effectChance, description, power, type }) => {
    const { tier } = usePokemon();
    const baseColor =
        tier === "legendary"
            ? "bg-legendary dark:text-gray-300"
            : tier === "mythical"
                ? "bg-mythical dark:text-gray-300"
                : "bg-slate-50 dark:bg-slate-700/70 text-gray-400";
    return (
        <div className={`
            rounded-lg border border-slate-100 dark:border-gray-600/50 p-4
            ${baseColor}
        `}>
            <div className="flex flex-row-reverse gap-4 items-center">
                <div className="flex flex-col w-full gap-2">
                    <div className="flex flex-row justify-between">
                        <p className="text-lg bolder text-gray-600 dark:text-gray-300">
                            <FadeText key={name} text={formatText(name, "-")} />
                        </p>
                        <div>
                            <ChipComponent title={type} />
                        </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        <FadeText key={description} text={description} />
                    </p>
                    <p className="text-sm text-gray-400">
                        <FadeText key={effect} text={effect} />
                    </p>
                    <div className="flex flex-row justify-evenly text-gray-500 dark:text-gray-300">
                        <div>
                            <p title="accuracy">
                                <FadeText key={accuracy} text={`ACC ${accuracy}`} />
                            </p>
                        </div>
                        <div>
                            <p title="power">
                                <FadeText key={power} text={`PWR ${power}`} />
                            </p>
                        </div>
                        <div>
                            <p title="effect chance">
                                <FadeText key={effectChance} text={`EFF ${effectChance}`} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}